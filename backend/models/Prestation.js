const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prestationSchema = new Schema({
    pai_num_operation: String,
    pai_prestataire: ObjectID,
    pai_montant: Number,
    pai_devis: {
        pai_devis_status: String,
        pai_devis_file_name: String,
        pai_devis_file_path: String,
        pai_devis_new_file_name: String,
        pai_devis_new_file_path: String,
    },
    pai_bc: {
        pai_bc_status: String,
        pai_bc_file_name: String,
        pai_bc_file_path: String,
        pai_bc_new_file_name: String,
        pai_bc_new_file_path: String,
    },
    pai_facture: {
        pai_facture_status: String,
        pai_facture_file_name: String,
        pai_facture_file_path: String,
        pai_facture_new_file_name: String,
        pai_facture_new_file_path: String,
    },
    pai_csf: {
        pai_csf_status: String,
        pai_csf_file_name: String,
        pai_csf_file_path: String,
        pai_csf_new_file_name: String,
        pai_csf_new_file_path: String,
    },
    pai_commentaire: String,
    pai_date_creation: Date,
});

const Prestation = mongoose.model("Prestation", prestationSchema);

module.exports = Prestation