module.exports = app => {
    const order = require("../controllers/orders.controller");

    var router = require("express").Router();

    router.post("/create", order.create);

    router.post("/mail", order.mail);

    app.use('/api/orders', router);
};