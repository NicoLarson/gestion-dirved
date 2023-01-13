const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prestataireSchema = new Schema({
    pre_nom: String,
    pre_type: String,
    pre_adresse: String,
    pre_telephone: String,
    pre_email: String,
    pre_date_creation: Date,
    pre_rib: {
        pre_rib_file_name: String,
        pre_rib_file_path: String,
        pre_rib_new_file_name: String,
        pre_rib_new_file_path: String,
    },
    pre_kbis: {
        pre_kbis_file_name: String,
        pre_kbis_file_path: String,
        pre_kbis_new_file_name: String,
        pre_kbis_new_file_path: String,
    },
    pre_description: String,
});

const Prestataire = mongoose.model("Prestataire", prestataireSchema);

module.exports = Prestataire