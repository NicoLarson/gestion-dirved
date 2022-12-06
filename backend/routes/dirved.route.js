const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const mongoose = require("mongoose");

/*
 * READ
 */
recordRoutes.route("/convention/list").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("conventions")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching conventions!");
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route("/paiement/list").get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("paiements")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching conventions!");
      } else {
        res.json(result);
      }
    });
});

/*
 * READ BY ID
 */
recordRoutes.get("/conventions/:id", (req, res, next) => {
  let db_connect = dbo.getDb();
  if (db_connect) {
    db_connect
      .collection("conventions")
      .findOne({ num_operation: req.params.id }, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
  }
});

recordRoutes.route("/paiements/:id").get(async function (_req, res) {
  let db_connect = dbo.getDb();
  if (db_connect) {
    db_connect
      .collection("paiements")
      .findOne({ num_operation: req.params.id }, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
  }
});

// This section will help you create a new record.
recordRoutes.route("/convention/create").post((req, res, next) => {
  const Convention = new mongoose.model("Convention", {
    num_operation: String,
    nom_responsable: {
      nom: String,
      prenom: String,
      fonction: String,
      email: String,
    },
    nom_operation: String,
    date_debut: Date,
    date_fin: Date,
    montant: Number,
    montant_encaisse: Number,
    piece_jointe: String,
    categories: [String],
    partenaires: [String],
    date_creation: Date,
  });

  const dbConnect = dbo.getDb();
  const matchConvention = new Convention({
    num_operation: req.body.num_operation,
    nom_responsable: req.body.nom_responsable,
    nom_operation: req.body.nom_operation,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
    montant: req.body.montant,
    montant_encaisse: req.body.montant_encaisse,
    piece_jointe: req.body.piece_jointe,
    categories: req.body.categorie,
    partenaires: req.body.partenaire,
    date_creation: new Date(),
  });

  dbConnect
    .collection("conventions")
    .insertOne(matchConvention, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        console.log(req.file, req.body);
        res.status(204).send();
      }
    });
});

recordRoutes.route("/convention/add/responsable").post((req, res, next) => {
  const dbConnect = dbo.getDb();

  const Responsable = new mongoose.model("Responsable", {
    res_nom: String,
    res_prenom: String,
    res_email: String,
  });
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
});

recordRoutes
  .route("/convention/show/responsable")
  .get(async function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("responsables")
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
      });
  });
// This section will help you update a record by id.
recordRoutes.route("/conventions/updateLike").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const conventionQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1,
    },
  };

  dbConnect
    .collection("conventionsAndReviews")
    .updateOne(conventionQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(
            `Error updating likes on convention with id ${conventionQuery.id}!`
          );
      } else {
        console.log("1 document updated");
      }
    });
});

// This section will help you delete a record.
recordRoutes.route("/convention/delete/:id").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const conventionQuery = { convention_id: req.body.id };

  dbConnect
    .collection("conventionsAndReviews")
    .deleteOne(conventionQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(
            `Error deleting convention with id ${conventionQuery.convention_id}!`
          );
      } else {
        console.log("1 document deleted");
      }
    });
});

module.exports = recordRoutes;
