import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import './CreatePrestation.scss'

// TODO Gérer les champs (obligatoires, format, etc.)
// TODO ajouter champ montant
export default function CreatePrestation() {
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

  const [form, setForm] = useState({
    pai_num_operation: '',
    pai_prestataire: '',
    pai_devis_piece_jointe: '',
    pai_devis_status: '',
    pai_bc_piece_jointe: '',
    pai_bc_status: '',
    pai_facture_piece_jointe: '',
    pai_facture_status: '',
    pai_csf_piece_jointe: '',
    pai_csf_status: '',
    pai_commentaire: '',
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPrestation = { ...form };

    await fetch('http://localhost:5000/create/prestation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPrestation),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: '', position: '', level: '' });
    navigate('/');
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className='CreatePrestation'>
      <h2>Ajouter Prestation</h2>
      <fieldset className='form-group'>
        <legend>Operation</legend>
        <form onSubmit={onSubmit} method="post" enctype="multipart/form-data" className='form-group row' >
          <div className="form-group">
            <label htmlFor="pai_num_operation">Numéro d'opération</label>
            <input
              type="text"
              className="form-control"
              id="pai_num_operation"
              value={form.pai_num_operation}
              onChange={(e) => updateForm({ pai_num_operation: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pai_prestataire">Prestataire</label>
            <select name="pai_prestataire" id="pai_prestataire" value={form.pai_prestataire}
              onChange={(e) => updateForm({ pai_prestataire: e.target.value })}>
              {prestataires.map((prestataire) => (
                <option value={prestataire._id}>{prestataire.pre_nom}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pai_devis_piece_jointe">Devis</label>
            <input
              type="file"
              className="form-control"
              id="pai_devis_piece_jointe"
              value={form.pai_devis_piece_jointe}
              onChange={(e) => updateForm({ pai_devis_piece_jointe: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pai_devis_status">Status</label>
            <select name="pai_devis_status" id="pai_devis_status" value={form.pai_devis_status}
              onChange={(e) => updateForm({ pai_devis_status: e.target.value })}>
              <option value="En attente">En attente</option>
              <option value="Signé">Signé</option>
            </select>

          </div>
          <div className="form-group" >
            <label htmlFor="pai_bc_piece_jointe">Bon de commande</label>
          </div>

          <div className="form-group">
            <label htmlFor="pai_bc_status">Status: bon de commande</label>
            <select name="pai_bc_status" id="pai_bc_status" value={form.pai_bc_status}
              onChange={(e) => updateForm({ pai_bc_status: e.target.value })}>
              <option value="En attente">En attente</option>
              <option value="En cours">En cours</option>
              <option value="Validé">Validé</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pai_facture_piece_jointe">Facture</label>
            <input
              type="file"
              className="form-control"
              id="pai_facture_piece_jointe"
              value={form.pai_facture_piece_jointe}
              onChange={(e) => updateForm({ pai_facture_piece_jointe: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pai_facture_status">Status: facture</label>
            <select name="pai_facture_status" id="pai_facture_status" value={form.pai_facture_status}
              onChange={(e) => updateForm({ pai_facture_status: e.target.value })}>
              <option value="En attente">En attente</option>
              <option value="Validé">Validé</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pai_csf_piece_jointe">CSF</label>
            <input
              type="file"
              className="form-control"
              id="pai_csf_piece_jointe"
              value={form.pai_csf_piece_jointe}
              onChange={(e) => updateForm({ pai_csf_piece_jointe: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pai_csf_status">Status: CSF</label>
            <select name="pai_csf_status" id="pai_csf_status" value={form.pai_csf_status}
              onChange={(e) => updateForm({ pai_csf_status: e.target.value })}>
              <option value="En attente">En attente</option>
              <option value="Signé">Signé</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pai_commentaire">Commentaire</label>
            <textarea
              name="pai_commentaire"
              type="text"
              className="form-control"
              id="pai_commentaire"
              value={form.pai_commentaire}
              onChange={(e) => updateForm({ pai_commentaire: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Ajouter"
              className="btn btn-outline-success"
            />
          </div>
        </form>
      </fieldset >
    </div >
  );
}
