import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AddResponsable() {
  const [form, setForm] = useState({
    res_nom: '',
    res_prenom: '',
    res_email: '',
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
    const newResponsable = { ...form };

    await fetch('http://localhost:5000/add/responsable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newResponsable),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: '', position: '', level: '' });
    navigate('/');
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className='card card-body bg-base-100 shadow-xl'>
      <h3 className="card-title">Ajouter un responsable</h3>
      <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
        <div >
          <label htmlFor="res_nom">Nom</label>
          <input
            className='input input-bordered input-sm w-full'
            type="text"

            id="res_nom"
            value={form.res_nom}
            onChange={(e) => updateForm({ res_nom: e.target.value })}
          />
        </div>
        <div >
          <label htmlFor="res_prenom">Prénom</label>
          <input
            className='input input-bordered input-sm w-full'
            type="text"

            id="res_prenom"
            value={form.res_prenom}
            onChange={(e) => updateForm({ res_prenom: e.target.value })}
          />
        </div>
        <div >
          <label htmlFor="res_email">Email</label>
          <input
            className='input input-bordered input-sm w-full'
            type="email"

            id="res_email"
            value={form.res_email}
            onChange={(e) => updateForm({ res_email: e.target.value })}
          />
        </div>
        <div >
          <input
              className='btn btn-primary btn-sm mt-4 mb-4' 
            type="submit"
            value="Ajouter responsable"

          />
        </div>
      </form>
    </div>
  );
}
