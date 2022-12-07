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

const showResponsableName = (responsable) => {
    console.log("TEST showResponsableName")
    try {
        if (responsable["con_nom_responsable"] !== null) {
            console.log(responsable)
        }
    } catch (e) {
        console.error("Erreur: " + e)
        return 0
    }
    return responsable["con_nom_responsable"]
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

const Paiement = (props) => (
    <tr>
        <td>{props.paiement.con_num_operation}</td>
        <td>{props.paiement.con_nom_operation}</td>
        <td>{showResponsableName(props.paiement.con_responsable)}</td>
        <td>{dateIsDefined(props.paiement.con_date_debut)}</td>
        <td>{dateIsDefined(props.paiement.con_date_fin)}</td>
        <td>
            <span className={timeLeftClassName(timeLeft(props.paiement.con_date_fin))}>{timeLeft(props.paiement.con_date_fin)}</span>
        </td>

        <td>{props.paiement.con_montant} €</td>
        <td>{props.paiement.con_montant_encaisse} €</td>
        <td>{props.paiement.con_piece_jointes}</td>
        <td>{props.paiement.con_categories}</td>
        <td>{props.paiement.con_partenaires}</td>
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
        <div className="ShowPaiement">
            <h3>Paiements</h3>
            <table className="table table-hover" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Numéro d'opération </th>
                        <th>Opération </th>
                        <th>Responsable</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Temps restant</th>
                        <th>Montant</th>
                        <th>Montant encaissé</th>
                        <th>Pieces jointes</th>
                        <th>Catégories</th>
                        <th>Partenaires</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{paiementList()}</tbody>
            </table>
        </div>
    );
}