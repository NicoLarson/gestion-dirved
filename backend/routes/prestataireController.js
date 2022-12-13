const Prestataire = require("../models/Prestataire.js")
const dbo = require("../conn");
const ObjectId = require("mongodb").ObjectId;


exports.show_prestataires = (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("prestataires")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching prestataires!");
            } else {
                res.json(result);
            }
        })
}

exports.show_one_prestataire = (req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("prestataires")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
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
        pre_kbis: req.body.pre_kbis,
        pre_commentaire: req.body.pre_commentaire,
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
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            pre_nom: req.body.pre_nom,
            pre_type: req.body.pre_type,
            pre_adresse: req.body.pre_adresse,
            pre_telephone: req.body.pre_telephone,
            pre_email: req.body.pre_email,
            pre_date_update: new Date(),
            pre_rib: req.body.pre_rib,
            pre_kbis: req.body.pre_kbis,
            pre_commentaire: req.body.pre_commentaire,
        },
    };
    db_connect
        .collection("prestataires")
        .updateOne(myquery, newvalues, (err, res) => {
            if (err) throw err;
            console.log("1 document updated");
        });
}


exports.delete_prestataire = (req, res) => {
}