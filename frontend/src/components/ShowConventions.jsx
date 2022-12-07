import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import './ShowConventions.scss';

// const haveResponsable = (convention) => {
//     if (convention.con_responsable.con_nom_responsable) {
//         return convention.con_responsable.con_nom_responsable
//     } else {
//         return "Pas de responsable"
//     }
// }
const Convention = (props) => (
    <tr>
        <td>{props.convention.con_num_operation}</td>
        <td>{props.convention.con_nom_operation}</td>
        <td>{props.convention.con_nom_responsable}</td>
        <td>{dateFormat(props.convention.date_debut, "dd-mm-yyyy")}</td>
        <td>{dateFormat(props.convention.date_fin, "dd-mm-yyyy")}</td>
        <td>{props.convention.con_montant} €</td>
        <td>{props.convention.con_montant_encaisse} €</td>
        <td>{props.convention.con_piece_jointes}</td>
        <td>{props.convention.con_categories}</td>
        <td>{props.convention.con_partenaires}</td>
        <td>
            <Link className="btn btn-outline-warning" to={`/edit/${props.convention._id}`}>Modifier</Link>
        </td>
    </tr>
);

export default function ConventionList() {
    const [conventions, setConventions] = useState([]);

    // This method fetches the conventions from the database.
    useEffect(() => {
        async function getConventions() {
            const response = await fetch(`http://localhost:5000/show/conventions/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const conventions = await response.json();
            setConventions(conventions);
        }

        getConventions();

        return;
    }, [conventions.length]);

    // This method will delete a convention
    async function deleteConvention(id) {
        await fetch(`http://localhost:5000/convention/delete/${id}`, {
            method: "DELETE"
        });

        const newConventions = conventions.filter((el) => el._id !== id);
        setConventions(newConventions);
    }

    // This method will map out the conventions on the table
    function conventionList() {
        return conventions.map((convention) => {
            return (
                <Convention
                    convention={convention}
                    deleteConvention={() => deleteConvention(convention._id)}
                    key={convention._id}
                />
            );
        });
    }

    // This following section will display the table with the conventions of individuals.
    return (
        <div className="ShowConvention">
            <h3>Conventions</h3>
            <table className="table table-hover" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Numéro d'opération </th>
                        <th>Opération </th>
                        <th>Responsable</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Montant</th>
                        <th>Montant encaissé</th>
                        <th>Pieces jointes</th>
                        <th>Catégories</th>
                        <th>Partenaires</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{conventionList()}</tbody>
            </table>
        </div>
    );
}