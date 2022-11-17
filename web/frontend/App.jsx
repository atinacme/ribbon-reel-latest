import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import './App.css';
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import './node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Overview",
                  destination: "/Overview",
                },
                {
                  label: "Reel Orders",
                  destination: "/ReelOrders",
                },
                {
                  label: "Settings",
                  destination: "/Settings",
                },
                {
                  label: "Support",
                  destination: "/Support",
                }
              ]}
            />
            <Routes pages={pages} />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
