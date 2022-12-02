import React from 'react';

const DisplayConventions = ({ conventions }) => {
  return (
    <div>
      <h1>Conventions</h1>
      <table>
        <thead>
          <tr>
            <th>Numéro d'opération</th>
            <th>Responsable</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Montant</th>
            <th>Montant encaissé</th>
            <th>Pieces jointes</th>
            <th>Catégorie</th>
            <th>Partenaires</th>
          </tr>
        </thead>
        <tbody>
          {conventions.map((convention) => (
            <tr key={convention._id}>
              <td>{convention.num_operation}</td>
              <td>{convention.responsable}</td>
              <td>{convention.date_debut}</td>
              <td>{convention.date_fin}</td>
              <td>{convention.montant}</td>
              <td>{convention.montant_envaisse}</td>
              <td>{convention.pieces_jointes}</td>
              <td>{convention.categories}</td>
              <td>{convention.partenaires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayConventions;
