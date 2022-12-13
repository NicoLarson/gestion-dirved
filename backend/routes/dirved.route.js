const express = require("express");
const recordRoutes = express.Router();

const convention_controller = require("./conventionController.js")
const responsable_controller = require("./responsableController.js")
const prestataire_controller = require("./prestataireController.js")
const prestation_controller = require("./prestationController.js")

/*
  *  CONVENTION
*/
recordRoutes.route("/create/convention").get(convention_controller.create_convention);
recordRoutes.route("/show/conventions").get(convention_controller.show_conventions);
recordRoutes.route("/show/convention/:id").get(convention_controller.show_one_convention);
recordRoutes.route("/update/convention/:id").post(convention_controller.update_convention);
// TODO: Supprimer une convention 

/*
  *  RESPONSABLE
*/
recordRoutes.route("/show/responsables").get(responsable_controller.show_responsables);
recordRoutes.route("/show/responsable/:id").get(responsable_controller.show_one_responsable);
recordRoutes.route("/create/responsable").post(responsable_controller.create_responsable);
recordRoutes.route("/update/responsable/:id").post(responsable_controller.update_responsable);
// TODO: Supprimer un responsable

/*
  *  PRESTATION
*/
recordRoutes.route("/show/prestations").get(prestation_controller.show_prestations)
recordRoutes.route("/show/prestation/:id").get(prestation_controller.show_one_prestation);
recordRoutes.route("/create/prestation").post(prestation_controller.create_prestation)
// TODO: Mise a jour d'un prestation
recordRoutes.route("/update/prestation/:id").post(prestation_controller.update_prestation);
// TODO: Supprimer un prestation

/*
  *  PRESTATAIRE
*/
recordRoutes.route("/show/prestataires").get(prestataire_controller.show_prestataires);
recordRoutes.route("/show/prestataire/:id").get(prestataire_controller.show_one_prestataire);
recordRoutes.route("/create/prestataire").post(prestataire_controller.create_prestataire);
recordRoutes.route("/update/prestataire/:id").post(prestataire_controller.update_prestataire);
// TODO: Supprimer un prestataire

// ----------------------------------------------------

module.exports = recordRoutes;
