import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

const dateIsDefined = (date) => {
  if (date === null) {
    return '?';
  }
  return dateFormat(date, 'dd-mm-yyyy');
};

const timeLeft = (date) => {
  try {
    Date(date);
  } catch (e) {
    return 0;
  }
  if (date == null) {
    return '?';
  }
  const today = new Date();
  const dateFin = new Date(date);
  const timeDiff = dateFin.getTime() - today.getTime();
  const daysLeft = Math.round(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

// TODO: gestion des status
const statusPrestation = (prestation) => {
  const devisStatus = prestation.pai_devis_status;
  const bcStatus = prestation.pai_bc_status;
  const factureStatus = prestation.pai_facture_status;
  const csfStatus = prestation.pai_csf_status;
  let status = devisStatus;
  if (devisStatus === 'En attente') {
    status = `Devis ${devisStatus}`;
  } else if (devisStatus === 'Signé' && bcStatus === 'En attente') {
    status = `BC ${bcStatus}`;
  } else if (
    devisStatus === 'Signé' &&
    bcStatus === 'Validé' &&
    factureStatus === 'En attente'
  ) {
    status = factureStatus;
  } else if (
    devisStatus === 'Signé' &&
    bcStatus === 'Signé' &&
    factureStatus === 'Signé' &&
    csfStatus === 'En attente'
  ) {
    status = csfStatus;
  } else if (
    devisStatus === 'Signé' &&
    bcStatus === 'Signé' &&
    factureStatus === 'Signé' &&
    csfStatus === 'Signé'
  ) {
    status = 'Terminé';
  }

  return status;
};
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
      const prestatairesRes = await response.json();
      setPrestataires(prestatairesRes);
    }
    getPrestataires();
  }, [prestataires.length]);

  for (let i = 0; i < prestataires.length; i++) {
    if (prestataires[i]._id === prestataire) {
      return prestataires[i].pre_nom;
    }
  }
  return 0;
};

const Prestation = (props) => {
  const { prestation, deletePrestation } = props;
  const { _id, pai_num_operation, pai_prestataire, pai_montant, pai_date_update, pai_commentaire } = props.prestation;
  return (
    <tr>
      <td>{pai_num_operation}</td>
      <td>{displayPrestataireName(pai_prestataire)}</td>
      <td>{pai_montant} €</td>
      <td>{dateIsDefined(pai_date_update)}</td>
      <td>{timeLeft(pai_date_update)}</td>
      <td>{statusPrestation(prestation)}</td>
      <td>{pai_commentaire}</td>
      <td>
        <Link
          className="btn btn-warning btn-outline btn-xs"
          to={`/update/prestation/${_id}`}
        >
          Modifier
        </Link>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-error btn-outline btn-xs"
          onClick={deletePrestation}
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};

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

      const prestationsRes = await response.json();
      setPrestations(prestationsRes);
    }

    getPrestations();
  }, [prestations.length]);

  // This method will delete a prestation
  async function deletePrestation(id) {
    await fetch(`http://localhost:5000/delete/prestation/${id}`, {
      method: 'DELETE',
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
    <div className="overflow-x-auto">
      <h3 className="text-4xl font-bold m-8">Prestations</h3>
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Numéro d&apos;opération </th>
            <th>Prestataire </th>
            <th>Montant</th>
            <th>Date</th>
            <th>J</th>
            <th>Status </th>
            <th>Commentaire </th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{prestationList()}</tbody>
      </table>
    </div>
  );
}
