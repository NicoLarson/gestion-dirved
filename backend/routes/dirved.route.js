const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

// DONE
recordRoutes.route("/show/conventions").get(async function (_req, res) {
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

recordRoutes.route("/add/responsable").post((req, res, next) => {
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

recordRoutes.route("/show/responsable").get(async function (req, res) {
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
    })
});

recordRoutes.route("/show/responsable/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("responsables")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
recordRoutes.route("/show/convention/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("conventions")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/update/responsable/:id").post(function (req, response) {
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
});

// TODO

recordRoutes.route("/update/convention/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      res_nom: req.body.res_nom,
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
      con_date_creation: req.body.con_date_creation,
    },
  };
  db_connect
    .collection("conventions")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});


// This section will help you create a new record.
recordRoutes.route("/add/convention").post((req, res, next) => {
  const Convention = new mongoose.model("Convention", {
    con_num_operation: String,
    con_nom_operation: String,
    con_responsable: {
      con_nom_responsable: String,
      con_prenom_responsable: String,
      con_fonction: String,
      con_email_responsable: String,
    },
    con_date_debut: Date,
    con_date_fin: Date,
    con_montant: Number,
    con_montant_encaisse: Number,
    con_piece_jointes: String,
    con_categories: String,
    con_partenaires: String,
    con_date_creation: Date,
  });

  const dbConnect = dbo.getDb();
  const matchConvention = new Convention({
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
    con_date_creation: new Date(),
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
