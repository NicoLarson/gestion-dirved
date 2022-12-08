const Convention = require("../models/Convention.js")
const mongoose = require("mongoose");
const dbo = require("../conn");

exports.show_conventions = (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("conventions")
        .find({})
        .toArray((err, result) => {
            if (err) {
                res.status(400).send("Error fetching conventions!");
            } else {
                res.json(result);
            }
        })
}

exports.show_one_convention = (req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("conventions")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
}

exports.create_convention = (req, res) => {

    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            con_num_operation: req.body.con_num_operation,
            con_nom_operation: req.body.con_nom_operation,
            con_responsable: {
                con_nom_responsable: req.body.con_nom_responsable,
                con_prenom_responsable: req.body.con_prenom_responsable,
                con_fonction: req.body.con_fonction,
                con_email_responsable: req.body.con_email_responsable,
            },
            con_date_debut: req.body.con_date_debut,
            con_date_fin: req.body.con_date_fin,
            con_montant: req.body.con_montant,
            con_montant_encaisse: req.body.con_montant_encaisse,
            con_piece_jointes: req.body.con_piece_jointes,
            con_categories: req.body.con_categories,
            con_partenaires: req.body.con_partenaires,
            con_date_mise_a_jour: new Date(),
        },
    }
    db_connect
        .collection("conventions")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
}