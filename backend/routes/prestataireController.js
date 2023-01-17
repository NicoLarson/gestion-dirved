const Prestataire = require("../models/Prestataire.js")
const dbo = require("../conn")
const ObjectId = require("mongodb").ObjectId
const fs = require('fs')

const createName = (file, type) => {
    return type + `${new Date().getUTCFullYear()}${new Date().getUTCMonth()}${new Date().getUTCDate()}${new Date().getUTCHours()}${new Date().getUTCMinutes()}${new Date().getUTCSeconds()}${new Date().getUTCMilliseconds()}.${file.split('.').pop()}`
}

exports.show_prestataires = (req, res) => {
    const dbConnect = dbo.getDb()
    dbConnect
        .collection("prestataires")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching prestataires!")
            } else {
                res.json(result)
            }
        })
}

exports.show_one_prestataire = (req, res) => {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection("prestataires")
        .findOne(myquery, (err, result) => {
            if (err) throw err
            res.json(result)
        })
}

exports.create_prestataire = (req, res) => {
    const dbConnect = dbo.getDb()

    let ribNewFileName = ""
    let ribNewFilePath = ""

    let kbisNewFileName = ""
    let kbisNewFilePath = ""

    if (req.body.pre_rib_file_path != null && req.body.pre_rib_file_path != undefined && req.body.pre_rib_file_path != "") {
        ribNewFileName = createName(req.body.pre_rib_file_name, 'rib')
        ribNewFilePath = 'files/' + ribNewFileName
        fs.copyFile(req.body.pre_rib_file_path, ribNewFilePath, (err) => {
            if (err) throw err
            console.log(req.body.pre_rib_file_path + 'was copied to destination ' + ribNewFilePath)
        })
    }
    if (req.body.pre_kbis_file_path != null && req.body.pre_kbis_file_path != undefined && req.body.pre_kbis_file_path != "") {
        kbisNewFileName = createName(req.body.pre_kbis_file_name, 'kbis')
        kbisNewFilePath = 'files/' + kbisNewFileName
        fs.copyFile(req.body.pre_kbis_file_path, kbisNewFilePath, (err) => {
            if (err) throw err
            console.log(req.body.pre_kbis_file_path + 'was copied to destination ' + kbisNewFilePath)
        })
    }

    const matchPrestataire = new Prestataire({
        pre_nom: req.body.pre_nom,
        pre_type: req.body.pre_type,
        pre_adresse: req.body.pre_adresse,
        pre_telephone: req.body.pre_telephone,
        pre_email: req.body.pre_email,
        pre_date_creation: new Date(),
        pre_rib: {
            pre_rib_file_name: req.body.pre_rib_file_name,
            pre_rib_file_path: req.body.pre_rib_file_path,
            pre_rib_new_file_name: ribNewFileName,
            pre_rib_new_file_path: ribNewFilePath,
        },
        pre_kbis: {
            pre_kbis_file_name: req.body.pre_kbis_file_name,
            pre_kbis_file_path: req.body.pre_kbis_file_path,
            pre_kbis_new_file_name: kbisNewFileName,
            pre_kbis_new_file_path: kbisNewFilePath,
        },
        pre_description: req.body.pre_description,
    })

    dbConnect
        .collection("prestataires")
        .insertOne(matchPrestataire, (err, result) => {
            if (err) {
                res.status(400).send("Error inserting matches!")
            } else {
                console.log(`Added a new match with id ${result.insertedId}`)
                console.log(req.file, req.body)
                res.status(204).send()
            }
        })
}

exports.update_prestataire = (req, res) => {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    let newValues = {
        $set: {
            pre_nom: req.body.pre_nom,
            pre_type: req.body.pre_type,
            pre_adresse: req.body.pre_adresse,
            pre_telephone: req.body.pre_telephone,
            pre_email: req.body.pre_email,
            pre_date_update: new Date(),
            pre_rib: req.body.pre_rib,
            pre_kbis: req.body.pre_kbis,
            pre_description: req.body.pre_description,
        },
    }
    db_connect
        .collection("prestataires")
        .updateOne(myquery, newValues, (err, res) => {
            if (err) throw err
            console.log("1 document updated")
        })
}


exports.delete_prestataire = (req, res) => {
    let db_connect = dbo.getDb();
    try {
        let myquery = { _id: ObjectId(req.params.id) };
        if (!myquery) {
            return res.status(404).send({ error: 'Prestataire not found' });
        }
        db_connect
            .collection("prestataires")
            .deleteOne(myquery, (err, result) => {
                if (err) throw err;
                res.json(result);
            });
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.show_rib = (req, res) => {
    console.log("req.params.fileName => ", req.params.fileName)
    const filePath = './files/' + req.params.fileName;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // send the pdf to the client
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
    });
};
