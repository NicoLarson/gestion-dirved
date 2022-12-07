import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
const Convention = (props) => (
    <tr>
        <td>{props.convention.num_operation}</td>
        <td>{props.convention.nom_responsable}</td>
        <td>{dateFormat(props.convention.date_debut, "dd-mm-yyyy")}</td>
        <td>{dateFormat(props.convention.date_fin, "dd-mm-yyyy")}</td>
        <td>{props.convention.montant} €</td>
        <td>{props.convention.montant_encaise} €</td>
        <td>{props.convention.piece_jointe}</td>
        <td>{props.convention.categorie}</td>
        <td>{props.convention.partenaire}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.convention._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteConvention(props.convention._id);
                }}
            >
                Delete
            </button>
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
        <div>
            <h3>Convention List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Numéro d'opération </th>
                        <th>Responsable</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Montant</th>
                        <th>Montant encaissé</th>
                        <th>Pieces jointes</th>
                        <th>Catégories</th>
                        <th>Partenaires</th>
                    </tr>
                </thead>
                <tbody>{conventionList()}</tbody>
            </table>
        </div>
    );
}