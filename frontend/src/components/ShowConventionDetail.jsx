import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function ShowConventionDetail() {
  const [product, setProduct] = useState({});

  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/show/convention/${params.id.toString()}`
      );
      const data = await response.json();
      setProduct(data);
    }
    fetchData();
  }, [params.id]);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{product.con_num_operation}</h2>
        <h3 className="card-title">{product.con_nom_operation}</h3>
        <p className="card-title">Date de début: {product.con_date_debut}</p>
        <p className="card-title">Date de fin: {product.con_date_fin}</p>
        <p className="card-title">Montant: {product.con_montant}</p>
        <p className="card-title">
          Montant encaissée: {product.con_montant_encaisse}
        </p>
        <p className="card-title">
          Pieces jointes: {product.con_piece_jointes}
        </p>
        <p className="card-title">Catégorie: {product.con_categories}</p>
        <p className="card-title">Partenaires: {product.con_partenaires}</p>
        <p className="card-title">
          Dernière mise à jour: {product.con_date_mise_a_jour}
        </p>
        <p className="card-title">{product.con_nom_responsable}</p>
        <p className="card-title">{product.con_prenom_responsable}</p>
        <p className="card-title">{product.con_fonction_responsable}</p>
        <div className="card-actions justify-end">
          <Link className="btn btn-warning btn-outline" to="/show/conventions">
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}
