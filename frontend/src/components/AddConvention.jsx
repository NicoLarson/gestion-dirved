import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AddConvention() {
  const [form, setForm] = useState({
    num_operation: '',
    nom_responsable: '',
    date_debut: '',
    date_fin: '',
    montant: '',
    montant_encaisse: '',
    piece_jointes: [],
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
    const newConvention = { ...form };

    await fetch('http://localhost:5000/convention/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConvention),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: '', position: '', level: '' });
    navigate('/');
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Ajouter une convention</h3>
      <form onSubmit={onSubmit} method="post" enctype="multipart/form-data">
        <div className="form-group">
          <label htmlFor="num_operation">Numéro d'opération</label>
          <input
            type="text"
            className="form-control"
            id="num_operation"
            value={form.num_operation}
            onChange={(e) => updateForm({ num_operation: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nom_responsable">Responsable</label>
          <input
            type="text"
            className="form-control"
            id="nom_responsable"
            value={form.nom_responsable}
            onChange={(e) => updateForm({ nom_responsable: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nom_operation">Nom opération</label>
          <input
            type="text"
            className="form-control"
            id="nom_operation"
            value={form.nom_operation}
            onChange={(e) => updateForm({ nom_operation: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_debut">Date de début</label>
          <input
            type="date"
            className="form-control"
            id="date_debut"
            value={form.date_debut}
            onChange={(e) => updateForm({ date_debut: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_fin">Date de fin</label>
          <input
            type="date"
            className="form-control"
            id="date_fin"
            value={form.date_fin}
            onChange={(e) => updateForm({ date_fin: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="montant">Montant</label>
          <input
            type="number"
            min="0"
            step="any"
            className="form-control"
            id="montant"
            value={form.montant}
            onChange={(e) => updateForm({ montant: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="montant_encaisse">Montant encaissé</label>
          <input
            type="number"
            min="0"
            step="any"
            className="form-control"
            id="montant_encaisse"
            value={form.montant_encaisse}
            onChange={(e) => updateForm({ montant_encaisse: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="piece_jointe">Pièce jointe</label>
          <input
            name="piece_jointe"
            type="file"
            className="form-control"
            id="piece_jointe"
            value={form.piece_jointe}
            onChange={(e) => updateForm({ piece_jointe: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="categorie">Catégorie</label>
          <input
            type="text"
            className="form-control"
            id="categorie"
            value={form.categorie}
            onChange={(e) => updateForm({ categorie: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="partenaire">Partenaire</label>
          <input
            type="text"
            className="form-control"
            id="partenaire"
            value={form.partenaire}
            onChange={(e) => updateForm({ partenaire: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Ajouter conventions"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
