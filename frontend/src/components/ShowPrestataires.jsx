import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Prestataire = (props) => {
  const { deletePrestataire } = props;
  const {
    _id,
    pre_nom,
    pre_type,
    pre_adresse,
    pre_telephone,
    pre_email,
    pre_description,
    pre_rib_new_file_path,
    pre_kbis_new_file_path,
  } = props.prestataire;
  return (
    <tr>
      <td className="max-w-xs overflow-auto"> {pre_nom}</td>
      <td className="max-w-xs overflow-auto">{pre_type}</td>
      <td className="max-w-xs overflow-auto">{pre_adresse}</td>
      <td className="max-w-xs overflow-auto">{pre_telephone}</td>
      <td className="max-w-xs overflow-auto">{pre_email}</td>
      <td>
        {' '}
        <a
          className="btn btn-info btn-outline btn-xs"
          href={`http://localhost:5000/${props.prestataire.pre_rib.pre_rib_new_file_path}`}
          target="_blank"
          rel="noreferrer"
        >
          Afficher
        </a>
      </td>
      <td>
        <a
          className="btn btn-info btn-outline btn-xs"
          href={`http://localhost:5000/${props.prestataire.pre_kbis.pre_kbis_new_file_path}`}
          target="_blank"
          rel="noreferrer"
        >
          Afficher
        </a>
      </td>
      <td>{pre_description}</td>
      <td>
        <Link
          className="btn btn-warning btn-outline btn-xs"
          to={`/update/prestataire/${_id}`}
        >
          Modifier
        </Link>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-outline btn-xs"
          onClick={deletePrestataire}
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};

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
      const prestatairesRes = await response.json();
      setPrestataires(prestatairesRes);
    }
    getPrestataires();
  }, [prestataires.length]);

  // This method will delete a prestataire
  async function deletePrestataire(id) {
    await fetch(`http://localhost:5000/delete/prestataire/${id}`, {
      method: 'DELETE',
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
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{prestataireList()}</tbody>
      </table>
    </div>
  );
}
