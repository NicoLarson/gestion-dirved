import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// TODO afficher RIB et KBIS avec bouton pour les afficher


const Prestataire = (props) => (

    <tr>
        <td className="max-w-xs overflow-auto">{props.prestataire.pre_nom}</td>
        <td className="max-w-xs overflow-auto">{props.prestataire.pre_type}</td>
        <td className="max-w-xs overflow-auto">{props.prestataire.pre_adresse}</td>
        <td className="max-w-xs overflow-auto">{props.prestataire.pre_telephone}</td>
        <td className="max-w-xs overflow-auto">{props.prestataire.pre_email}</td>
        <td className="max-w-xs overflow-auto">{props.prestataire.pre_rib.pre_rib_new_file_path}</td>
        <td>
            <Link className="btn btn-info btn-outline btn-xs" to={`/openfile/${props.prestataire.pre_rib.pre_rib_new_file_path}`}>Afficher</Link>
        </td>
        <td> <button className="btn btn-info btn-outline btn-xs">Afficher</button> </td>
        <td>{props.prestataire.pre_description}</td>
        <td>
            <Link className="btn btn-warning btn-outline btn-xs" to={`/update/prestataire/${props.prestataire._id}`}>Modifier</Link>
        </td>
        <td>
            <button className="btn btn-danger btn-outline btn-xs" onClick={props.deletePrestataire}>Supprimer</button>
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
        await fetch(`http://localhost:5000/delete/prestataire/${id}`, {
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
        <div className="overflow-x-auto">
            <h3 className="text-4xl font-bold m-8">Prestataires</h3>
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th>Nom </th>
                        <th>Type </th>
                        <th>Adresse</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>RIB</th>
                        <th>KBIS</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{prestataireList()}</tbody>
            </table>
        </div>
    );
}