import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// TODO Ajouter documents
export default function CreateConvention() {
  const [form, setForm] = useState({
    con_num_operation: '',
    con_nom_operation: '',
    con_responsable: {
      con_nom_responsable: '',
      con_prenom_responsable: '',
      con_fonction: '',
      con_email_responsable: '',
    },
    con_date_debut: '',
    con_date_fin: '',
    con_montant: '',
    con_montant_encaisse: '',
    con_piece_jointes: [],
    con_categories: '',
    con_partenaires: '',
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

    await fetch('http://localhost:5000/create/convention', {
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
    <div className="card card-body bg-base-100 shadow-xl">
      <h2 className="card-title">Ajouter Convention</h2>
      <fieldset>
        <legend className="card-title">Responsable</legend>
        <div>
          <label className="label" htmlFor="con_nom_responsable">
            Nom
          </label>
          <input
            className="input input-bordered input-sm w-full max-w-xs"
            type="text"
            id="con_nom_responsable"
            value={form.con_nom_responsable}
            onChange={(e) =>
              updateForm({ con_nom_responsable: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="con_prenom_responsable">
            Prénom
          </label>
          <input
            className="input input-bordered input-sm w-full max-w-xs"
            type="text"
            id="con_prenom_responsable"
            value={form.con_prenom_responsable}
            onChange={(e) =>
              updateForm({ con_prenom_responsable: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="con_fonction_responsable">
            Fonction
          </label>
          <input
            className="input input-bordered input-sm w-full max-w-xs"
            type="text"
            id="con_fonction_responsable"
            value={form.con_fonction_responsable}
            onChange={(e) =>
              updateForm({ con_fonction_responsable: e.target.value })
            }
          />
        </div>
        <div>
          <label className="label" htmlFor="con_email_responsable">
            Email
          </label>
          <input
            className="input input-bordered input-sm w-full max-w-xs"
            type="text"
            id="con_email_responsable"
            value={form.con_email_responsable}
            onChange={(e) =>
              updateForm({ con_email_responsable: e.target.value })
            }
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="card-title">Convention</legend>
        <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
          <div className="form-control">
            <label className="label" htmlFor="con_num_operation">
              Numéro d'opération
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="text"
              id="con_num_operation"
              value={form.con_num_operation}
              onChange={(e) =>
                updateForm({ con_num_operation: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label" htmlFor="con_nom_operation">
              Opération
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="text"
              id="con_nom_operation"
              value={form.con_nom_operation}
              onChange={(e) =>
                updateForm({ con_nom_operation: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label" htmlFor="con_date_debut">
              Date de début
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="date"
              id="con_date_debut"
              value={form.con_date_debut}
              onChange={(e) => updateForm({ con_date_debut: e.target.value })}
            />
          </div>
          <div>
            <label className="label" htmlFor="con_date_fin">
              Date de fin
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="date"
              id="con_date_fin"
              value={form.con_date_fin}
              onChange={(e) => updateForm({ con_date_fin: e.target.value })}
            />
          </div>
          <div>
            <label className="label" htmlFor="con_montant">
              Montant
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="number"
              min="0"
              step="any"
              id="con_montant"
              value={form.con_montant}
              onChange={(e) => updateForm({ con_montant: e.target.value })}
            />
          </div>
          <div>
            <label className="label" htmlFor="con_montant_encaisse">
              Montant encaissé
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="number"
              min="0"
              step="any"
              id="con_montant_encaisse"
              value={form.con_montant_encaisse}
              onChange={(e) =>
                updateForm({ con_montant_encaisse: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label" htmlFor="con_piece_jointes">
              Pièce jointe
            </label>
            <input
              type="file"
              className="file-input file-input-sm w-full max-w-xs"
              id="con_piece_jointes"
              value={form.con_piece_jointes}
              onChange={(e) =>
                updateForm({ con_piece_jointes: e.target.value })
              }
            />
          </div>
          {/* TODO Gérer plusieurs catégories (ex: Font structurels; Institutionnels doivent ce mettre dans un tableau dans Mongodb) */}
          <div>
            <label className="label" htmlFor="con_categories">
              Catégories
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="text"
              id="con_categories"
              value={form.con_categories}
              onChange={(e) => updateForm({ con_categories: e.target.value })}
            />
          </div>
          {/* TODO Gérer plusieurs Partenaires (ex: CNRS; CNES doivent ce mettre dans un tableau Mongodb  ) */}
          <div>
            <label className="label" htmlFor="con_partenaires">
              Partenaires
            </label>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="text"
              id="con_partenaires"
              value={form.con_partenaires}
              onChange={(e) => updateForm({ con_partenaires: e.target.value })}
            />
          </div>
          <div>
            <input
              className="btn btn-primary btn-sm mt-4 mb-4"
              type="submit"
              value="Ajouter"
            />
          </div>
        </form>
      </fieldset>
    </div>
  );
}
