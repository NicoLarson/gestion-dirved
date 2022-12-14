const Prestation = require("../models/Prestation.js")
const dbo = require("../conn");
const ObjectId = require("mongodb").ObjectId;
const fs = require('fs');


const createName = (file, type) => {
    return type + `${new Date().getUTCFullYear()}${new Date().getUTCMonth()}${new Date().getUTCDate()}${new Date().getUTCHours()}${new Date().getUTCMinutes()}${new Date().getUTCSeconds()}${new Date().getUTCMilliseconds()}.${file.split('.').pop()}`
}

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
    let newValues = {
        $set: {
            pai_num_operation: req.body.pai_num_operation,
            pai_prestataire: req.body.pai_prestataire,
            pai_montant: req.body.pai_montant,
            pai_devis: req.body.pai_devis,
            pai_bc: req.body.pai_bc,
            pai_facture: req.body.pai_facture,
            pai_csf: req.body.pai_csf,
            pai_commentaire: req.body.pai_commentaire,
            pai_date_update: new Date(),
        },
    }
    db_connect
        .collection("prestations")
        .updateOne(myquery, newValues, (err, _result) => {
            if (err) {
                res.status(400).send(`Error updating likes on listing with id ${myquery.id}!`);
            } else {
                console.log("1 document updated")
            }
        });
}

exports.create_prestation = (req, res) => {

    const dbConnect = dbo.getDb();

    let devisNewFileName = ""
    let devisNewFilePath = ""
    let bcNewFileName = ""
    let bcNewFilePath = ""
    let factureNewFileName = ""
    let factureNewFilePath = ""
    let csfNewFileName = ""
    let csfNewFilePath = ""

    if (req.body.pai_devis_file_path != null && req.body.pai_devis_file_path != "" && req.body.pai_devis_file_path != undefined) {
        devisNewFileName = createName(req.body.pai_devis_file_path, "devis")
        devisNewFilePath = 'Z:\\NICOLAS\\DiRVED\\prestations\\' + devisNewFileName
        fs.copyFile(req.body.pai_devis_file_path, devisNewFilePath, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    }

    if (req.body.pai_bc_file_path != null && req.body.pai_bc_file_path != "" && req.body.pai_bc_file_path != undefined) {
        bcNewFileName = createName(req.body.pai_bc_file_path, "bc")
        bcNewFilePath = 'Z:\\NICOLAS\\DiRVED\\prestations\\' + bcNewFileName
        fs.copyFile(req.body.pai_bc_file_path, bcNewFilePath, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    }

    if (req.body.pai_facture_file_path != null && req.body.pai_facture_file_path != "" && req.body.pai_facture_file_path != undefined) {
        factureNewFileName = createName(req.body.pai_facture_file_path, "facture")
        factureNewFilePath = 'Z:\\NICOLAS\\DiRVED\\prestations\\' + factureNewFileName
        fs.copyFile(req.body.pai_facture_file_path, factureNewFilePath, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    }

    if (req.body.pai_csf_file_path != null && req.body.pai_csf_file_path != "" && req.body.pai_csf_file_path != undefined) {
        csfNewFileName = createName(req.body.pai_csf_file_path, "csf")
        csfNewFilePath = 'Z:\\NICOLAS\\DiRVED\\prestations\\' + csfNewFileName
        fs.copyFile(req.body.pai_csf_file_path, csfNewFilePath, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    }

    let matchPrestation = new Prestation({
        pai_num_operation: req.body.pai_num_operation,
        pai_prestataire: req.body.pai_prestataire,
        pai_montant: req.body.pai_montant,
        pai_devis: {
            pai_devis_status: req.body.pai_devis_status,
            pai_devis_file_name: req.body.pai_devis_file_name,
            pai_devis_file_path: devisNewFilePath,
            pai_devis_new_file_name: devisNewFileName,
            pai_devis_new_file_path: devisNewFilePath,
        },
        pai_bc: {
            pai_bc_status: req.body.pai_bc_status,
            pai_bc_file_name: req.body.pai_bc_file_name,
            pai_bc_file_path: bcNewFilePath,
            pai_bc_new_file_name: bcNewFileName,
            pai_bc_new_file_path: bcNewFilePath,
        },
        pai_facture: {
            pai_facture_status: req.body.pai_facture_status,
            pai_facture_file_name: req.body.pai_facture_file_name,
            pai_facture_file_path: factureNewFilePath,
            pai_facture_new_file_name: factureNewFileName,
            pai_facture_new_file_path: factureNewFilePath,
        },
        pai_csf: {
            pai_csf_status: req.body.pai_csf_status,
            pai_csf_file_name: req.body.pai_csf_file_name,
            pai_csf_file_path: csfNewFilePath,
            pai_csf_new_file_name: csfNewFileName,
            pai_csf_new_file_path: csfNewFilePath,
        },
        pai_commentaire: req.body.pai_commentaire,
        pai_date_creation: new Date(),
    }
    )

    dbConnect
        .collection("prestations")
        .insertOne(matchPrestation, (err, _result) => {
            if (err) {
                res.status(400).send("Error creating prestation!");
            } else {
                res.status(201).send("Prestation created!");
            }
        })
}

