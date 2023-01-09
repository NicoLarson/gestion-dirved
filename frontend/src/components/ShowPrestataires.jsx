import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// TODO afficher RIB et KBIS avec bouton pour les afficher

const Prestataire = (props) => (
    <tr>
        <td>{props.prestataire.pre_nom}</td>
        <td>{props.prestataire.pre_type}</td>
        <td>{props.prestataire.pre_adresse}</td>
        <td>{props.prestataire.pre_telephone}</td>
        <td>{props.prestataire.pre_email}</td>
        <td> <button>Afficher</button> </td>
        <td> <button>Afficher</button> </td>
        <td>{props.prestataire.pre_description}</td>
        <td>
            <Link className="btn btn-outline-warning" to={`/update/prestataire/${props.prestataire._id}`}>Modifier</Link>
        </td>
    </tr>
);

export default function ShowPrestataires() {
    const [prestataires, setPrestataires] = useState([]);

    // This method fetches the prestataires from the database.
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

        return;
    }, [prestataires.length]);

    // This method will delete a prestataire
    async function deletePrestataire(id) {
        await fetch(`http://localhost:5000/prestataire/delete/${id}`, {
            method: "DELETE"
        });

        const newPrestataires = prestataires.filter((el) => el._id !== id);
        setPrestataires(newPrestataires);
    }

    // This method will map out the prestataires on the table
    function prestataireList() {
        return prestataires.map((prestataire) => {
            return (
                <Prestataire
                    prestataire={prestataire}
                    deletePrestataire={() => deletePrestataire(prestataire._id)}
                    key={prestataire._id}
                />
            );
        });
    }

    // This following section will display the table with the prestataires of individuals.
    return (
        <div className="ShowPrestataires">
            <h3>Prestataires</h3>
            <table className="table table-hover" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Nom </th>
                        <th>Type </th>
                        <th>Adresse</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>RIB</th>
                        <th>KBIS</th>
                        <th>Commentaire</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{prestataireList()}</tbody>
            </table>
        </div>
    );
}