const Responsable = require("../models/Responsable.js")
const dbo = require("../conn");
const ObjectId = require("mongodb").ObjectId;

exports.show_responsables = (req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            res_nom: req.body.res_nom,
            res_prenom: req.body.res_prenom,
            res_email: req.body.res_email,
        },
    };
    db_connect
        .collection("responsables")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
}

exports.show_one_responsable = (req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("responsables")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
}

exports.create_responsable = (req, res) => {
    const dbConnect = dbo.getDb();

    const matchResponsable = new Responsable({
        res_nom: req.body.res_nom,
        res_prenom: req.body.res_prenom,
        res_email: req.body.res_email,
    });

    dbConnect
        .collection("responsables")
        .insertOne(matchResponsable, function (err, result) {
            if (err) {
                res.status(400).send("Error inserting matches!");
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                console.log(req.file, req.body);
                res.status(204).send();
            }
        });
}

exports.update_responsable = (req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            res_nom: req.body.res_nom,
            res_prenom: req.body.res_prenom,
            res_email: req.body.res_email,
        },
    };
    db_connect
        .collection("responsables")
        .updateOne(myquery, newvalues, (err, res) => {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
}