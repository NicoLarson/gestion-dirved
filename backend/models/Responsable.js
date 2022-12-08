const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responsableSchema = new Schema({
    res_nom: String,
    res_prenom: String,
    res_email: String,
});

const Responsable = mongoose.model("Responsable", responsableSchema);

module.exports = Responsable