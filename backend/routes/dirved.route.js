const express = require("express");
const recordRoutes = express.Router();

const convention_controller = require("./conventionController.js")
const prestataire_controller = require("./prestataireController.js")
const prestation_controller = require("./prestationController.js")

/*
  *  CONVENTION
*/
recordRoutes.route("/create/convention").post(convention_controller.create_convention);
recordRoutes.route("/show/conventions").get(convention_controller.show_conventions);
recordRoutes.route("/show/convention/:id").get(convention_controller.show_one_convention);
recordRoutes.route("/update/convention/:id").post(convention_controller.update_convention);
recordRoutes.route("/delete/convention/:id").delete(convention_controller.delete_convention);

/*
  *  PRESTATION
*/
recordRoutes.route("/show/prestations").get(prestation_controller.show_prestations)
recordRoutes.route("/show/prestation/:id").get(prestation_controller.show_one_prestation);
recordRoutes.route("/create/prestation").post(prestation_controller.create_prestation)
recordRoutes.route("/update/prestation/:id").post(prestation_controller.update_prestation);
recordRoutes.route("/delete/prestation/:id").delete(prestation_controller.delete_prestation);

/*
  *  PRESTATAIRE
*/
recordRoutes.route("/show/prestataires").get(prestataire_controller.show_prestataires);
recordRoutes.route("/show/prestataire/:id").get(prestataire_controller.show_one_prestataire);
recordRoutes.route("/create/prestataire").post(prestataire_controller.create_prestataire);
recordRoutes.route("/update/prestataire/:id").post(prestataire_controller.update_prestataire);
recordRoutes.route("/delete/prestataire/:id").delete(prestataire_controller.delete_prestataire);

// ----------------------------------------------------

const fs = require('fs');

recordRoutes.route('/files/:fileName').get(prestataire_controller.show_rib);

module.exports = recordRoutes;
