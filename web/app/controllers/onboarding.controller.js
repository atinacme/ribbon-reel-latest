const db = require("../models");
const Onboarding = db.onboardings;
const Op = db.Sequelize.Op;

// Create and Save a new Onboarding
exports.create = (req, res) => {
    // Validate request
    if (!req.body.merchant_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Onboarding
    const onboarding = {
        merchant_name: req.body.merchant_name,
        store_name: req.body.store_name,
        account_email: req.body.account_email,
        layout: req.body.layout,
        subscription_plan: req.body.subscription_plan
    };

    // Save Onboarding in the database
    Onboarding.create(onboarding)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Onboarding."
            });
        });
};

// Retrieve all Onboardings from the database.
exports.findAll = (req, res) => {
    const merchant_name = req.query.merchant_name;
    var condition = merchant_name ? { merchant_name: { [Op.iLike]: `%${merchant_name}%` } } : null;

    Onboarding.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving onboardings."
            });
        });
};

// Find a single Onboarding with an id
exports.findOne = (req, res) => {
    const store_name = req.query.store_name;

    Onboarding.findByPk(store_name)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Onboarding with store_name=${store_name}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Onboarding with store_name=" + store_name
            });
        });
};