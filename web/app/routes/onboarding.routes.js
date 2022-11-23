module.exports = app => {
    const onboardings = require("../controllers/onboarding.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", onboardings.create);

    // Retrieve all Onboardings
    router.get("/", onboardings.findAll);

    // Retrieve a single Onboarding with id
    router.get("/:id", onboardings.findOne);

    app.use('/api/onboardings', router);
};