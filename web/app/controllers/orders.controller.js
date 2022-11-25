const db = require("../models");
const Order = db.orders;

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body.store_name) {
        res.status(400).send({
            message: "Store name can not be empty!"
        });
        return;
    }

    // Create a Order
    const order = {
        store_name: req.body.store_name,
        order_name: req.body.order_name,
        date: req.body.date,
        customer: req.body.customer,
        total: req.body.total,
        reel_revenue: req.body.reel_revenue,
        shipping_status: req.body.shipping_status,
        reel_status: req.body.reel_status,
        items: req.body.items
    };

    // Save Order in the database
    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        });
};