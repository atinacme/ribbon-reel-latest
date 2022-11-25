module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        store_name: {
            type: Sequelize.STRING
        },
        order_name: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        customer: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.STRING
        },
        reel_revenue: {
            type: Sequelize.STRING
        },
        shipping_status: {
            type: Sequelize.STRING
        },
        reel_status: {
            type: Sequelize.STRING
        },
        items: {
            type: Sequelize.STRING
        }
    });

    return Order;
};