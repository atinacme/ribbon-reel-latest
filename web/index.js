// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import { setupGDPRWebHooks } from "./gdpr.js";
import productCreator from "./helpers/product-creator.js";
import redirectToAuth from "./helpers/redirect-to-auth.js";
import { BillingInterval } from "./helpers/ensure-billing.js";
import { AppInstallations } from "./app_installations.js";
import axios from "axios";
import moment from 'moment';
import cron from 'node-cron';

const USE_ONLINE_TOKENS = false;

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

// TODO: There should be provided by env vars
const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

const DB_PATH = `${process.cwd()}/database.sqlite`;

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: process.env.HOST.split("://")[0],
  API_VERSION: LATEST_API_VERSION,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  // See note below regarding using CustomSessionStorage with this template.
  SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
  ...(process.env.SHOP_CUSTOM_DOMAIN && { CUSTOM_SHOP_DOMAINS: [process.env.SHOP_CUSTOM_DOMAIN] }),
});

// NOTE: If you choose to implement your own storage strategy using
// Shopify.Session.CustomSessionStorage, you MUST implement the optional
// findSessionsByShopCallback and deleteSessionsCallback methods.  These are
// required for the app_installations.js component in this template to
// work properly.

Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
  path: "/api/webhooks",
  webhookHandler: async (_topic, shop, _body) => {
    await AppInstallations.delete(shop);
  },
});

Shopify.Webhooks.Registry.addHandler("PRODUCTS_CREATE", {
  path: "/api/webhooks",
  webhookHandler: async (_topic, shop, _body) => {
    console.log('webhook fired for product creation--->');
  },
});

Shopify.Webhooks.Registry.addHandler("ORDERS_CREATE", {
  path: "/api/webhooks/orders_create",
  webhookHandler: async (_topic, shop, _body) => {
    console.log('webhook fired for order updation--->');
  },
});

Shopify.Webhooks.Registry.addHandler("FULFILLMENTS_CREATE", {
  path: "/api/webhooks/fulfillment_events_create",
  webhookHandler: async (_topic, shop, _body) => {
    console.log('webhook fired for fulfillment events creation--->');
  },
});

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const BILLING_SETTINGS = {
  required: false,
  // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
  // chargeName: "My Shopify One-Time Charge",
  // amount: 5.0,
  // currencyCode: "USD",
  // interval: BillingInterval.OneTime,
};

// This sets up the mandatory GDPR webhooks. You’ll need to fill in the endpoint
// in the “GDPR mandatory webhooks” section in the “App setup” tab, and customize
// the code when you store customer data.
//
// More details can be found on shopify.dev:
// https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks
setupGDPRWebHooks("/api/webhooks");
// export for test use only
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  billingSettings = BILLING_SETTINGS
) {
  const app = express();
  const session = [];

  app.set("use-online-tokens", USE_ONLINE_TOKENS);
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app, {
    billing: billingSettings,
  });

  // Do not call app.use(express.json()) before processing webhooks with
  // Shopify.Webhooks.Registry.process().
  // See https://github.com/Shopify/shopify-api-node/blob/main/docs/usage/webhooks.md#note-regarding-use-of-body-parsers
  // for more details.
  app.get("/api/utils", async (req, res) => {
    try {
      const currentSession = await Shopify.Utils.loadCurrentSession(
        req,
        res,
        app.get("use-online-tokens")
      );
      session.push(currentSession);
      res.status(200).send(currentSession);
      // register product creation webhook
      const webhookProductCreate = await Shopify.Webhooks.Registry.register({
        shop: currentSession?.shop,
        accessToken: currentSession?.accessToken,
        topic: "PRODUCTS_CREATE",
        path: "/api/webhooks",
      });

      if (!webhookProductCreate["PRODUCTS_CREATE"].success) {
        console.log(
          `Failed to register PRODUCTS_CREATE webhook: ${webhookProductCreate.result}`
        );
      }
      console.log("webhookProductCreate---->", webhookProductCreate);

      // register order updation webhook
      const webhookOrderCreate = await Shopify.Webhooks.Registry.register({
        shop: currentSession?.shop,
        accessToken: currentSession?.accessToken,
        topic: "ORDERS_CREATE",
        path: "/api/webhooks/orders_create",
      });

      console.log("webhookOrderCreate---->", webhookOrderCreate);

      // register fulfillment event creation webhook
      const webhookFulfillmentEventCreate = await Shopify.Webhooks.Registry.register({
        shop: currentSession?.shop,
        accessToken: currentSession?.accessToken,
        topic: "FULFILLMENTS_CREATE",
        path: "/api/webhooks/fulfillment_events_create",
      });

      console.log("webhookFulfillmentEventCreate---->", webhookFulfillmentEventCreate);

      if (!webhookOrderCreate["ORDERS_CREATE"].success) {
        console.log(
          `Failed to register ORDERS_CREATE webhook: ${webhookOrderCreate.result}`
        );
      }

      if (!webhookFulfillmentEventCreate["FULFILLMENTS_CREATE"].success) {
        console.log(
          `Failed to register FULFILLMENTS_CREATE webhook: ${webhookFulfillmentEventCreate.result}`
        );
      }
    } catch (e) {
      console.log(`Failed to get utils: ${e.message}`);
    }
  });

  app.post("/api/webhooks/orders_create", async (req, res) => {
    try {
      const { Order } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );
      await Shopify.Webhooks.Registry.process(req, res);
      const orderData = await Order.find({
        session: session[0],
        id: req.header('x-shopify-order-id'),
      });
      if (orderData) {
        const lineItems = orderData.line_items.map((itms) => (
          itms.vendor.indexOf("RIBBON_REELS_CARD") > -1));
        const array = lineItems.includes(true);
        if (array) {
          const { Shop } = await import(
            `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
          );
          const shopData = await Shop.all({ session: session[0] });
          axios.post('http://localhost:8080/api/orders/mail', {
            mail_to: orderData.customer.email,
            store_owner: shopData[0].store_owner,
            order_number: orderData.order_number
          })
            .then(function (response) {
              console.log('order in---->', response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    } catch (e) {
      console.log(`Failed to process webhook: ${e.message}`);
      if (!res.headersSent) {
        res.status(500).send(e.message);
      }
    }
  });

  app.post("/api/webhooks/fulfillment_events_create", async (req, res) => {
    console.log('new--->', session);
    try {
      const { Order, Fulfillment, FulfillmentEvent } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );
      await Shopify.Webhooks.Registry.process(req, res);
      const orderData = await Order.find({
        session: session[0],
        id: req.header('x-shopify-order-id'),
      });
      const orderArray = [orderData];
      const lineItems = orderArray.map(itm => itm.line_items.map((itms) => (itms.vendor.indexOf("RIBBON_REELS_CARD") > -1 ? itms.vendor : 0)).indexOf("RIBBON_REELS_CARD") > -1 ? itm : []);
      const rows = lineItems.map(element => {
        if (!Array.isArray(element)) {
          return element;
        }
      });
      const rowsArray = rows.filter(item => item !== undefined);
      const fulfillmentItems = rowsArray.map(itm =>
        itm.fulfillments.map((itms) =>
          itms.line_items.map((items) =>
            items.vendor.indexOf("RIBBON_REELS_CARD") > -1 ? items.vendor : 0).indexOf("RIBBON_REELS_CARD") > -1 ? itms : 0
        ));
      const fulfillmentArray = fulfillmentItems.filter(item => item.length !== 0);
      fulfillmentArray.map(elements => {
        elements.map(async element => {
          const fulfillmentData = await Fulfillment.find({
            session: session[0],
            order_id: element.order_id,
            id: element.id,
          });
          if (fulfillmentData) {
            const { Shop } = await import(
              `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
            );
            const fulfillmentEventData = await FulfillmentEvent.all({
              session: session[0],
              order_id: fulfillmentData.order_id,
              fulfillment_id: fulfillmentData.id,
            });
            console.log("fulfillmentArray--->", fulfillmentEventData);
            if (fulfillmentEventData) {
              const fulfillmentParticularEventData = fulfillmentEventData.map(async (item) => {
                return await FulfillmentEvent.find({
                  session: session[0],
                  order_id: item.order_id,
                  fulfillment_id: item.fulfillment_id,
                  id: item.id,
                });
              });
              if (fulfillmentParticularEventData) {
                if (fulfillmentParticularEventData.fulfillment_event.status === "out_for_delivery") {
                  const shopData = await Shop.all({ session: session[0] });
                  axios.post('http://localhost:8080/api/orders/mail', {
                    mail_to: orderData.customer.email,
                    store_owner: shopData[0].store_owner,
                    order_number: orderData.order_number
                  })
                    .then(async function (response) {
                      console.log('fulfillment in---->', response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
                var estimatedDate = new Date(moment(fulfillmentParticularEventData.fulfillment_event.estimated_delivery_at).format('MM/DD/YYYY'));
                var estimatedDays = Math.round(((estimatedDate.getTime()) / (1000 * 3600 * 60 * 60 * 24))).toFixed(0);
                cron.schedule(`0 0 ${estimatedDays} * *`, async () => {
                  const shopData = await Shop.all({ session: session[0] });
                  axios.post('http://localhost:8080/api/orders/mail', {
                    mail_to: orderData.customer.email,
                    store_owner: shopData[0].store_owner,
                    order_number: orderData.order_number
                  })
                    .then(async function (response) {
                      console.log('fulfillment in---->', response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                });
              }
            }
          }
        });
      });
    } catch (e) {
      console.log(`Failed to process webhook: ${e.message}`);
      if (!res.headersSent) {
        res.status(500).send(e.message);
      }
    }
  });

  // All endpoints after this point will require an active session
  app.use(
    "/api/*",
    verifyRequest(app, {
      billing: billingSettings,
    })
  );

  app.get("/api/shop", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    const { Shop } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );

    const shopData = await Shop.all({ session });
    res.status(200).send(shopData);
  });

  app.get("/api/products/count", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    const { Product } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );

    const countData = await Product.count({ session });
    res.status(200).send(countData);
  });

  app.get("/api/products/create", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    let status = 200;
    let error = null;

    try {
      await productCreator(session);
    } catch (e) {
      console.log(`Failed to process products/create: ${e.message}`);
      status = 500;
      error = e.message;
    }
    res.status(status).send({ success: status === 200, error });
  });

  app.get("/api/orders/all", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    const { Order } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );

    const allData = await Order.all({ session: session });
    res.status(200).send(allData);
  });

  app.get("/api/order/:id", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    const { Order } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );

    const allData = await Order.find({ session: session, id: req.params.id });
    res.status(200).send(allData);
  });

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json());

  app.use((req, res, next) => {
    const shop = Shopify.Utils.sanitizeShop(req.query.shop);
    if (Shopify.Context.IS_EMBEDDED_APP && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${encodeURIComponent(
          shop
        )} https://admin.shopify.com;`
      );
    } else {
      res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
    }
    next();
  });

  if (isProd) {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    app.use(compression());
    app.use(serveStatic(PROD_INDEX_PATH, { index: false }));
  }

  app.use("/*", async (req, res, next) => {
    if (typeof req.query.shop !== "string") {
      res.status(500);
      return res.send("No shop provided");
    }

    const shop = Shopify.Utils.sanitizeShop(req.query.shop);
    const appInstalled = await AppInstallations.includes(shop);

    if (!appInstalled && !req.originalUrl.match(/^\/exitiframe/i)) {
      return redirectToAuth(req, res, app);
    }

    if (Shopify.Context.IS_EMBEDDED_APP && req.query.embedded !== "1") {
      const embeddedUrl = Shopify.Utils.getEmbeddedAppUrl(req);

      return res.redirect(embeddedUrl + req.path);
    }

    const htmlFile = join(
      isProd ? PROD_INDEX_PATH : DEV_INDEX_PATH,
      "index.html"
    );

    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(htmlFile));
  });

  return { app };
}

createServer().then(({ app }) => app.listen(PORT));
