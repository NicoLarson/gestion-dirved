import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AddPrestataire() {
    const [form, setForm] = useState({
        pre_nom: "",
        pre_type: "",
        pre_adresse: "",
        pre_telephone: "",
        pre_email: "",
        pre_rib: "",
        pre_kbis: "",
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
        const newPrestataire = { ...form };

        await fetch('http://localhost:5000/create/prestataire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPrestataire),
        }).catch((error) => {
            window.alert(error);
            return;
        });

        setForm({ name: '', position: '', level: '' });
        navigate('/');
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className='AddConvention'>
            <h2>Ajouter Prestataire</h2>
            <fieldset className='form-group'>
                <legend>Prestataire</legend>
                <form onSubmit={onSubmit} method="post" enctype="multipart/form-data" className='form-group row'>
                    <div className="form-group">
                        <label htmlFor="pre_nom">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pre_nom"
                            value={form.pre_nom}
                            onChange={(e) => updateForm({ pre_nom: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_type">Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pre_type"
                            value={form.pre_type}
                            onChange={(e) => updateForm({ pre_type: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_adresse">Adresse</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pre_adresse"
                            value={form.pre_adresse}
                            onChange={(e) => updateForm({ pre_adresse: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_telephone">Telephone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pre_telephone"
                            value={form.pre_telephone}
                            onChange={(e) => updateForm({ pre_telephone: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="pre_email"
                            value={form.pre_email}
                            onChange={(e) => updateForm({ pre_email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_rib">RIB</label>
                        <input
                            type="file"
                            className="form-control"
                            id="pre_rib"
                            value={form.pre_rib}
                            onChange={(e) => updateForm({ pre_rib: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_kbis">KBIS</label>
                        <input
                            type="file"
                            className="form-control"
                            id="pre_kbis"
                            value={form.pre_kbis}
                            onChange={(e) => updateForm({ pre_kbis: e.target.value })}
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
