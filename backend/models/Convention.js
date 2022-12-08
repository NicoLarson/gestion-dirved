const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conventionSchema = new Schema({
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

const Convention = mongoose.model("Convention", conventionSchema);

module.exports = Convention