const uploadFile = require("../middleware/upload");
const db = require("../models");
const fs = require('fs');
const File = db.files;
const Op = db.Sequelize.Op;
const baseUrl = 'http://localhost:8080/api/file/files/';

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        const file = {
            order_number: req.body.order_number,
            filename: req.file.originalname,
            filepath: req.file.path
        };
        File.create(file)
            .then(data => {
                res.status(200).send({
                    message: "Uploaded the file successfully: " + req.file.originalname,
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Onboarding."
                });
            });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 20MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

// Retrieve all Files of Particular Order Number from the database.
const findFile = (req, res) => {
    const order_number = req.body.order_number;
    var condition = order_number ? { order_number: { [Op.iLike]: `%${order_number}%` } } : null;

    File.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving file."
            });
        });
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

module.exports = {
    upload,
    findFile,
    getListFiles,
    download,
};