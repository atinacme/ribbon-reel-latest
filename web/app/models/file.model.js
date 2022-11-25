module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
        order_number: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        },
        filepath: {
            type: Sequelize.STRING
        }
    });

    return File;
};