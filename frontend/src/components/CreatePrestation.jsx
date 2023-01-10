import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';

// TODO Ajouter condition "disable" les champs si le devis est uploader on peut uploader le bs etc
const CreatePrestation = () => {
  const navigate = useNavigate();
  const [prestataires, setPrestataires] = useState([]);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target

    const formData = new FormData(form);

    const pai_num_operation = formData.get('pai_num_operation');
    const pai_prestataire = formData.get('pai_prestataire');
    const pai_montant = formData.get('pai_montant');
    const pai_devis = formData.get('pai_devis');
    const pai_devis_status = formData.get('pai_devis_status');
    const pai_bc = formData.get('pai_bc');
    const pai_bc_status = formData.get('pai_bc_status');
    const pai_facture = formData.get('pai_facture');
    const pai_facture_status = formData.get('pai_facture_status');
    const pai_csf = formData.get('pai_csf');
    const pai_csf_status = formData.get('pai_csf_status');
    const pai_commentaire = formData.get('pai_commentaire');

    const data = {
      pai_num_operation,
      pai_prestataire,
      pai_montant,
      pai_devis,
      pai_devis_status,
      pai_devis_file_name: pai_devis.name,
      pai_devis_file_path: pai_devis.path,
      pai_bc,
      pai_bc_status,
      pai_bc_file_name: pai_bc.name,
      pai_bc_file_path: pai_bc.path,
      pai_facture,
      pai_facture_status,
      pai_facture_file_name: pai_facture.name,
      pai_facture_file_path: pai_facture.path,
      pai_csf,
      pai_csf_status,
      pai_csf_file_name: pai_csf.name,
      pai_csf_file_path: pai_csf.path,
      pai_commentaire,
    }

    await fetch('http://localhost:5000/create/prestation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    navigate('/');
  }

  return (
    <div className='card card-body bg-base-100 shadow-xl'>
      <h2 className="card-title">Ajouter Prestation</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label className="label font-bold" htmlFor="pai_num_operation">Numéro d'opération</label>
          <input
            className='input input-bordered input-sm w-full '
            name="pai_num_operation"
            id="pai_num_operation"
            type="text"

          />
        </div>
        <div className="form-control">
          <label className="label font-bold" htmlFor="pai_prestataire">Prestataire</label>
          <select name="pai_prestataire" id="pai_prestataire">
            {prestataires.map((prestataire) => (
              <option value={prestataire._id}>{prestataire.pre_nom}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label font-bold" htmlFor="pai_montant">Montant</label>
          <input
            className='input input-bordered input-sm w-full '
            name="pai_montant"
            id="pai_montant"
            type="number"

            min="0"
            step="0.01"
          />
        </div>
        <div className="form-control">
          <label className="label font-bold" htmlFor="pai_devis">Devis</label>
          <input
            name="pai_devis"
            type="file"
            className="file-input file-input-sm w-full max-w-xs"
            id="pai_devis"
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="pai_devis_status">Status</label>
          <select name="pai_devis_status" id="pai_devis_status">
            <option value="En attente">En attente</option>
            <option value="Signé">Signé</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label font-bold" htmlFor="pai_bc">Bon de commande</label>
          <input
            name="pai_bc"
            type="file"
            className="file-input file-input-sm w-full max-w-xs"
            id="pai_bc"
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="pai_bc_status">Status</label>
          <select name="pai_bc_status" id="pai_bc_status">
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Validé">Validé</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label font-bold" htmlFor="pai_facture">Facture</label>
          <input
            className="file-input file-input-sm w-full max-w-xs"
            name="pai_facture"
            type="file"
            id="pai_facture"
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="pai_facture_status">Status</label>
          <select name="pai_facture_status" id="pai_facture_status">
            <option value="En attente">En attente</option>
            <option value="Validé">Validé</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label font-bold" htmlFor="pai_csf">CSF</label>
          <input
            className="file-input file-input-sm w-full max-w-xs"
            name="pai_csf"
            type="file"
            id="pai_csf"
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="pai_csf_status">Status</label>
          <select name="pai_csf_status" id="pai_csf_status">
            <option value="En attente">En attente</option>
            <option value="Signé">Signé</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="pai_commentaire">Commentaire</label>
          <textarea
            className='textarea textarea-bordered'
            name="pai_commentaire"
            id="pai_commentaire"
          />
        </div>
        <input
          className='btn btn-primary btn-sm mt-4 mb-4' type="submit" value="Ajouter" />
      </form>
    </div>
  )
}

export default CreatePrestation