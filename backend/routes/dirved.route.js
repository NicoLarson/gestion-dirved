const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../conn");
const ObjectId = require("mongodb").ObjectId;
const Operation = require("../models/Operation.js")
const Convention = require("../models/Convention.js")

const convention_controller = require("./conventionController.js")
const responsable_controller = require("./responsableController.js")
const prestataire_controller = require("./prestataireController.js")


/*
  *  CONVENTION
*/
// TODO: Ajouter une convention 

// Afficher conventions
recordRoutes.route("/show/conventions").get(convention_controller.show_conventions);

// Afficher une convention
recordRoutes.route("/show/convention/:id").get(convention_controller.show_one_convention);

// Mettre à jour une convention
recordRoutes.route("/update/convention/:id").post(convention_controller.create_convention);

// TODO: Supprimer une convention 


/*
  *  RESPONSABLE
*/
// Afficher responsable
recordRoutes.route("/show/responsables").get(responsable_controller.show_responsables);

// Afficher un responsable
recordRoutes.route("/show/responsable/:id").get(responsable_controller.show_one_responsable);

// Ajouter un responsable
recordRoutes.route("/create/responsable").post(responsable_controller.create_responsable);

// Mise à jour d'un responsable	
recordRoutes.route("/update/responsable/:id").post(responsable_controller.update_responsable);

// TODO: Supprimer un responsable


/*
  *  PAIEMENT
*/
// TODO: Afficher paiement
// TODO: Afficher un paiement
// TODO: Ajouter paiement
// TODO: Mise a jour d'un paieemnt
// TODO: Supprimer un paiement


/*
  *  PRESTATAIRE
*/
// Afficher prestatires
recordRoutes.route("/show/prestataires").get(prestataire_controller.show_prestataires);

// TODO: Afficher un prestataire
// Ajouter prestataire
recordRoutes.route("/create/prestataire").post(prestataire_controller.create_prestataire);

// TODO: Mise a jour d'un prestataire
// TODO: Supprimer un prestataire

recordRoutes.route("/create/paiement").post((req, res, next) => {
  const dbConnect = dbo.getDb();

  const matchResponsable = new Operation({
    pai_num_operation: req.body.pai_num_operation,
    pai_prestatire: req.body.pai_prestatire,
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
  });

  dbConnect
    .collection("paiements")
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


// This section will help you create a new record.
recordRoutes.route("/create/convention").post((req, res, next) => {
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
