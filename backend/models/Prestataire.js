const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prestataireSchema = new Schema({
    pre_nom: String,
    pre_type: String,
    pre_adresse: String,
    pre_telephone: String,
    pre_email: String,
    pre_date_creation: Date,
    pre_rib: String,
    pre_kbis: String,
});

const Prestataire = mongoose.model("Prestataire", prestataireSchema);

module.exports = Prestataire