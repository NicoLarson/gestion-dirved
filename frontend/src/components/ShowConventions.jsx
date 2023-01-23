import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dateFormat, { masks } from 'dateformat';
// TODO Ajouter avenant
// TODO Ajouter alert par email

const dateIsDefined = (date) => {
  if (date === null) {
    return '?';
  } else {
    return dateFormat(date, 'dd-mm-yyyy');
  }
};

const showResponsableName = (responsable) => {
  try {
    if (responsable['con_nom_responsable'] !== null) {
    }
  } catch (e) {
    // console.error("Erreur: " + e)
    return 0;
  }
  return (
    responsable['con_nom_responsable'] +
    ' ' +
    responsable['con_prenom_responsable']
  );
};

const timeLeft = (date) => {
  try {
    new Date(date);
  } catch (e) {
    console.error('Erreur: ' + e);
    return 0;
  }
  if (date == null) {
    return '?';
  } else {
    const today = new Date();
    const dateFin = new Date(date);
    const timeDiff = dateFin.getTime() - today.getTime();
    const daysLeft = Math.round(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  }
};

const timeLeftClassName = (daysLeft) => {
  if (daysLeft < 0) {
    return 'badge badge-ghost';
  } else if (daysLeft < 30) {
    return 'badge badge-warning';
  } else if (daysLeft > 30) {
    return 'badge badge-success';
  } else {
    return 'badge badge-light';
  }
};

const Convention = (props) => (
  <tr>
    <td>{props.convention.con_num_operation}</td>
    <td className="max-w-xs overflow-hidden hover:overflow-auto">
      {props.convention.con_nom_operation}
    </td>
    <td>{dateIsDefined(props.convention.con_date_debut)}</td>
    <td>{dateIsDefined(props.convention.con_date_fin)}</td>
    <td>
      <span
        className={timeLeftClassName(timeLeft(props.convention.con_date_fin))}
      >
        {timeLeft(props.convention.con_date_fin)}
      </span>
    </td>
    <td>{props.convention.con_montant} €</td>
    <td>{props.convention.con_montant_encaisse} €</td>
    <td>
      <Link
        className="btn btn-primary btn-outline btn-xs"
        to={`/show/convention/${props.convention._id}`}
      >
        Detail
      </Link>
    </td>
    <td>
      <Link
        className="btn btn-warning btn-outline btn-xs"
        to={`/update/convention/${props.convention._id}`}
      >
        Modifier
      </Link>
    </td>
    <td>
      <button
        className="btn btn-error btn-outline btn-xs"
        onClick={props.deleteConvention}
      >
        Supprimer
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
    await fetch(`http://localhost:5000/delete/convention/${id}`, {
      method: 'DELETE',
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
    <div className="overflow-x-auto">
      <h3 className="text-4xl font-bold m-8">Conventions</h3>
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>OPE</th>
            <th>Opération </th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Temps restant</th>
            <th>CT OPE</th>
            <th>Encaissé</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{conventionList()}</tbody>
      </table>
    </div>
  );
}
