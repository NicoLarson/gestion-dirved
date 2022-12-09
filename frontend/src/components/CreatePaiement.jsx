import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './CreatePaiement.scss'
export default function CreatePaiement() {
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
    const newPaiement = { ...form };

    await fetch('http://localhost:5000/create/paiement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPaiement),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: '', position: '', level: '' });
    navigate('/');
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className='CreatePaiement'>
      <h2>Ajouter Paiement</h2>
      <fieldset className='form-group'>
        <legend>Operation</legend>
        <form onSubmit={onSubmit} method="post" enctype="multipart/form-data" className='form-group row'>
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
            <label htmlFor="pai_prestatire">Prestataire</label>
            <input
              type="text"
              className="form-control"
              id="pai_prestatire"
              value={form.pai_prestatire}
              onChange={(e) => updateForm({ pai_prestatire: e.target.value })}
            />
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
            <div>
              <input type="radio" id="pai_devis_status" name="drone" value={form.pai_devis_status}
                onChange={(e) => updateForm({ pai_devis_status: e.target.value })} />
              <label htmlFor="pai_devis_status">En cours</label>
            </div>

            <div>
              <input type="radio" id="pai_devis_status" name="drone" value={form.pai_devis_status} onChange={(e) => updateForm({ pai_devis_status: e.target.value })} />
              <label htmlFor="pai_devis_status">Termine</label>
            </div>

            <div>
              <input type="radio" id="pai_devis_status" name="drone" value={form.pai_devis_status} onChange={(e) => updateForm({ pai_devis_status: e.target.value })} />
              <label htmlFor="pai_devis_status">En retard</label>
            </div>

          </div>
          <div className="form-group">
            <label htmlFor="pai_bc_piece_jointe">Bon de commande</label>
            <input
              type="file"
              className="form-control"
              id="pai_bc_piece_jointe"
              value={form.pai_bc_piece_jointe}
              onChange={(e) => updateForm({ pai_bc_piece_jointe: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pai_bc_status">Status: bon de commande</label>
            <input
              type="text"
              className="form-control"
              id="pai_bc_status"
              value={form.pai_bc_status}
              onChange={(e) => updateForm({ pai_bc_status: e.target.value })}
            />
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
            <input
              type="text"
              className="form-control"
              id="pai_facture_status"
              value={form.pai_facture_status}
              onChange={(e) => updateForm({ pai_facture_status: e.target.value })}
            />
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
            <input
              name="pai_csf_status"
              type="text"
              className="form-control"
              id="pai_csf_status"
              value={form.pai_csf_status}
              onChange={(e) => updateForm({ pai_csf_status: e.target.value })}
            />
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
