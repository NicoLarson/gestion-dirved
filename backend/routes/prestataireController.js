const Prestataire = require("../models/Prestataire.js")
const mongoose = require("mongoose");
const dbo = require("../conn");

exports.show_prestataires = (req, res) => {
}

exports.show_one_prestataire = (req, res) => {
}

exports.create_prestataire = (req, res) => {
    const dbConnect = dbo.getDb();
    const matchPrestataire = new Prestataire({
        pre_nom: req.body.pre_nom,
        pre_type: req.body.pre_type,
        pre_adresse: req.body.pre_adresse,
        pre_telephone: req.body.pre_telephone,
        pre_email: req.body.pre_email,
        pre_date_creation: new Date(),
        pre_rib: req.body.pre_rib,
        pre_kbis: req.body.pre_kbis,
    });

    dbConnect
        .collection("prestataires")
        .insertOne(matchPrestataire, (err, result) => {
            if (err) {
                res.status(400).send("Error inserting matches!");
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                console.log(req.file, req.body);
                res.status(204).send();
            }
        });
}

exports.update_prestataire = (req, res) => {
}


exports.delete_prestataire = (req, res) => {
}