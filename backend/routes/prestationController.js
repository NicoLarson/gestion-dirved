const Prestation = require("../models/Prestation.js")
const dbo = require("../conn");
const ObjectId = require("mongodb").ObjectId;
const fs = require('fs');

exports.show_prestations = (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("prestations")
        .find({})
        .toArray((err, result) => {
            if (err) {
                res.status(400).send("Error fetching prestations!");
            } else {
                res.json(result);
            }
        })
}

exports.show_one_prestation = (req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("prestations")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
}

exports.update_prestation = (req, res) => {
    console.log(req.body.con_nom_responsable)
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            pai_num_operation: req.body.pai_num_operation,
            pai_prestataire: req.body.pai_prestataire,
            pai_devis_piece_jointe: req.body.pai_devis_piece_jointe,
            pai_devis_status: req.body.pai_devis_status,
            pai_bc_piece_jointe: req.body.pai_bc_piece_jointe,
            pai_bc_status: req.body.pai_bc_status,
            pai_facture_piece_jointe: req.body.pai_facture_piece_jointe,
            pai_facture_status: req.body.pai_facture_status,
            pai_csf_piece_jointe: req.body.pai_csf_piece_jointe,
            pai_csf_status: req.body.pai_csf_status,
            pai_commentaire: req.body.pai_commentaire,
            pai_date_update: new Date(),
        },
    }
    db_connect
        .collection("prestations")
        .updateOne(myquery, newvalues, (err, _result) => {
            if (err) {
                res.status(400).send(`Error updating likes on listing with id ${myquery.id}!`);
            } else {
                console.log("1 document updated")
            }
        });
}

exports.create_prestation = (req, res) => {

    const dbConnect = dbo.getDb();
    const matchPrestation = new Prestation({
        pai_num_operation: req.body.pai_num_operation,
        pai_prestataire: req.body.pai_prestataire,
        pai_devis_piece_jointe: req.body.pai_devis_piece_jointe,
        pai_devis_status: req.body.pai_devis_status,
        pai_bc_piece_jointe: req.body.pai_bc_piece_jointe,
        pai_bc_status: req.body.pai_bc_status,
        pai_facture_piece_jointe: req.body.pai_facture_piece_jointe,
        pai_facture_status: req.body.pai_facture_status,
        pai_csf_piece_jointe: req.body.pai_csf_piece_jointe,
        pai_csf_status: req.body.pai_csf_status,
        pai_commentaire: req.body.pai_commentaire,
        pai_date_creation: new Date(),
    })
    dbConnect.collection("prestations").insertOne(matchPrestation, (err, _result) => {
        if (err) {
            res.status(400).send("Error creating prestation!");
        } else {
            res.status(201).send("Prestation created!");
        }
    })
}
