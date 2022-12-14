import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import './ShowPrestations.scss';

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
const statusPrestation = (prestation) => {

    const devis_status = prestation.pai_devis_status;
    const bc_status = prestation.pai_bc_status;
    const facture_status = prestation.pai_facture_status;
    const csf_status = prestation.pai_csf_status;
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
const Prestation = (props) => (
    <tr>
        <td>{props.prestation.pai_num_operation}</td>
        <td>{displayPrestataireName(props.prestation.pai_prestataire)}</td>
        <td>{props.prestation.pai_montant} €</td>
        <td>{dateIsDefined(props.prestation.pai_date_fin)}</td>
        <td>{statusPrestation(props.prestation)}</td>
        <td>
            <Link className="btn btn-outline-warning" to={`/update/prestation/${props.prestation._id}`}>Modifier</Link>
        </td>
    </tr>
);

export default function PrestationList() {
    const [prestations, setPrestations] = useState([]);

    useEffect(() => {
        async function getPrestations() {
            const response = await fetch(`http://localhost:5000/show/prestations/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const prestations = await response.json();
            setPrestations(prestations);
        }

        getPrestations();

        return;
    }, [prestations.length]);

    // This method will delete a prestation
    async function deletePrestation(id) {
        await fetch(`http://localhost:5000/prestation/delete/${id}`, {
            method: "DELETE"
        });

        const newPrestations = prestations.filter((el) => el._id !== id);
        setPrestations(newPrestations);
    }

    // This method will map out the prestations on the table
    function prestationList() {
        return prestations.map((prestation) => {
            return (
                <Prestation
                    prestation={prestation}
                    deletePrestation={() => deletePrestation(prestation._id)}
                    key={prestation._id}
                />
            );
        });
    }

    // This following section will display the table with the prestations of individuals.
    return (
        <div className="ShowPrestations">
            <h3>Prestations</h3>
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
                <tbody>{prestationList()}</tbody>
            </table>
        </div>
    );
}