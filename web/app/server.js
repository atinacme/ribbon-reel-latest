const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const pg = require('pg');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'bhupendra.221singh@gmail.com',
        pass: 'euzatrngdefpdwqm'
    }
});
const cs = 'postgres://postgres:12345@localhost:5432/postgres';

const client = new pg.Client(cs);

client.connect();

const query = {
    text: 'SELECT * FROM orders',
    rowMode: 'array'
};

cron.schedule("0 0 23 * *", function () {
    client.query(query).then(res => {
        const data = res.rows;
        data.forEach(element => {
            console.log('all data', element[1]);
            const daysCount = ((Math.round(new Date().getTime() - new Date(element[5]).getTime())) / (1000 * 3600 * 24)).toFixed(0)
            if (daysCount > 6) {
                const mailConfigurations = {
                    from: 'bhupendra.221singh@gmail.com',
                    to: element[3],
                    subject: 'Add Video Message',
                    text: `Hi! ${element[2]}, if you want to add video message use the below link:
                http://localhost:3000?order_number=${element[4]}`
                };
                transporter.sendMail(mailConfigurations, function (error, info) {
                    if (error) throw Error(error);
                    res.send(info)
                });
            }
        })
    })
})
const app = express();
global.__basedir = __dirname;
var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/onboarding.routes")(app);
require("./routes/orders.routes")(app);
require("./routes/file.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});