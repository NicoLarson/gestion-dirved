const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationSchema = new Schema({
    pai_num_operation: String,
    pai_prestatire: String,
    pai_devis_piece_jointe: String,
    pai_devis_status: String,
    pai_bc_piece_jointe: String,
    pai_bc_status: String,
    pai_facture_piece_jointe: String,
    pai_facture_status: String,
    pai_csf_piece_jointe: String,
    pai_csf_status: String,
    pai_commentaire: String,
    pai_date_creation: Date,
});

const Operation = mongoose.model("Operation", operationSchema);

module.exports = Operation