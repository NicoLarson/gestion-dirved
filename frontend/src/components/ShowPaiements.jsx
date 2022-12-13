import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import './ShowPaiements.scss';

const dateIsDefined = (date) => {
    if (date === null) {
        return "?";
    } else {
        return dateFormat(date, "dd-mm-yyyy")
    }
}

const timeLeft = (date) => {
    try {
        new Date(date)
        console.log(new Date(date))
    } catch (e) {
        console.error("Erreur: " + e)
        return 0
    }
    if (date == null) {
        return "?";
    } else {
        const today = new Date();
        const dateFin = new Date(date);
        const timeDiff = dateFin.getTime() - today.getTime();
        const daysLeft = Math.round(timeDiff / (1000 * 3600 * 24))
        return daysLeft;
    }
}

const timeLeftClassName = (daysLeft) => {
    if (daysLeft < 0) {
        return "badge rounded-pill bg-danger";
    } else if (daysLeft < 30) {
        return "badge rounded-pill bg-warning";
    } else if (daysLeft > 30) {
        return "badge rounded-pill bg-success";
    } else {
        return "badge rounded-pill bg-light";
    }
}
// TODO: gestion des status
const statusPaiement = (paiement) => {

    const devis_status = paiement.pai_devis_status;
    const bc_status = paiement.pai_bc_status;
    const facture_status = paiement.pai_facture_status;
    const csf_status = paiement.pai_csf_status;
    let status = devis_status
    if (devis_status === "En attente") {
        status = "Devis " + devis_status
    } else if (devis_status === "Signé" && bc_status === "En attente") {
        status = "BC " + bc_status
    } else if (devis_status === "Signé" && bc_status === "Validé" && facture_status === "En attente") {
        status = facture_status
    } else if (devis_status === "Signé" && bc_status === "Signé" && facture_status === "Signé" && csf_status === "En attente") {
        status = csf_status
    } else if (devis_status === "Signé" && bc_status === "Signé" && facture_status === "Signé" && csf_status === "Signé") {
        status = "Terminé"
    }

    return status
}
// TODO Affichage des prestataires
const displayPrestataireName = (prestataire) => {
    const [prestataires, setPrestataires] = useState([]);
    useEffect(() => {
        async function getPrestataires() {
            const response = await fetch(`http://localhost:5000/show/prestataires/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const prestataires = await response.json();
            setPrestataires(prestataires);
        }
        getPrestataires();
    }, [prestataires.length]);

    for (let i = 0; i < prestataires.length; i++) {
        if (prestataires[i]._id === prestataire) {
            return prestataires[i].pre_nom
        }
    }
}
const Paiement = (props) => (
    <tr>
        <td>{props.paiement.pai_num_operation}</td>
        <td>{displayPrestataireName(props.paiement.pai_prestataire)}</td>
        <td>{props.paiement.pai_montant}</td>
        <td>{dateIsDefined(props.paiement.pai_date_fin)}</td>
        <td>{statusPaiement(props.paiement)}</td>
        <td>
            <Link className="btn btn-outline-warning" to={`/update/paiement/${props.paiement._id}`}>Modifier</Link>
        </td>
    </tr>
);

export default function PaiementList() {
    const [paiements, setPaiements] = useState([]);

    // This method fetches the paiements from the database.
    useEffect(() => {
        async function getPaiements() {
            const response = await fetch(`http://localhost:5000/show/paiements/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const paiements = await response.json();
            setPaiements(paiements);
        }

        getPaiements();

        return;
    }, [paiements.length]);

    // This method will delete a paiement
    async function deletePaiement(id) {
        await fetch(`http://localhost:5000/paiement/delete/${id}`, {
            method: "DELETE"
        });

        const newPaiements = paiements.filter((el) => el._id !== id);
        setPaiements(newPaiements);
    }

    // This method will map out the paiements on the table
    function paiementList() {
        return paiements.map((paiement) => {
            return (
                <Paiement
                    paiement={paiement}
                    deletePaiement={() => deletePaiement(paiement._id)}
                    key={paiement._id}
                />
            );
        });
    }

    // This following section will display the table with the paiements of individuals.
    return (
        <div className="ShowPaiements">
            <h3>Paiements</h3>
            <table className="table table-hover" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Numéro d'opération </th>
                        <th>Prestataire </th>
                        <th>Montant</th>
                        <th>Date</th>
                        <th>Status </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{paiementList()}</tbody>
            </table>
        </div>
    );
}