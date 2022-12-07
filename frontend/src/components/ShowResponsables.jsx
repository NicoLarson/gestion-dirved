import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Responsable = (props) => (
  <tr>
    <td>{props.responsable.res_nom}</td>
    <td>{props.responsable.res_prenom}</td>
    <td>{props.responsable.res_email}</td>
    <td>
      <Link className="btn btn-link" to={`/convention/update/responsable/${props.responsable._id}`}>
        Edit
      </Link>{' '}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteResponsable(props.responsable._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function ShowResponsable() {
  const [responsables, setResponsables] = useState([]);

  // This method fetches the responsables from the database.
  useEffect(() => {
    async function getResponsables() {
      const response = await fetch(
        `http://localhost:5000/show/responsable`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const responsables = await response.json();
      setResponsables(responsables);
    }
    getResponsables();

    return;
  }, [responsables.length]);

  // This method will delete a responsable
  async function deleteResponsable(id) {
    await fetch(`http://localhost:5000/convention/delete/${id}`, {
      method: 'DELETE',
    });

    const newResponsables = responsables.filter((el) => el._id !== id);
    setResponsables(newResponsables);
  }

  // This method will map out the responsables on the table
  function responsableList() {
    return responsables.map((responsable) => {
      return (
        <Responsable
          responsable={responsable}
          deleteResponsable={() => deleteResponsable(responsable._id)}
          key={responsable._id}
        />
      );
    });
  }

  // This following section will display the table with the responsables of individuals.
  return (
    <div>
      <h3>Responsable List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nom </th>
            <th>Prenom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{responsableList()}</tbody>
      </table>
    </div>
  );
}
