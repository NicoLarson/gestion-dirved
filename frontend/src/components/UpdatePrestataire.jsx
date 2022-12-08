import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdatePrestataire() {
    const [form, setForm] = useState({
        pre_nom: "",
        pre_type: "",
        pre_adresse: "",
        pre_telephone: "",
        pre_email: "",
        pre_rib: "",
        pre_kbis: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(
                `http://localhost:5000/show/prestataire/${params.id.toString()}`
            );

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate('/');
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPrestataire = {
            res_nom: form.res_nom,
            res_prenom: form.res_prenom,
            res_email: form.res_email,
        };

        // This will send a post request to update the data in the database.
        await fetch(
            `http://localhost:5000/update/prestataire/${params.id}`,
            {
                method: 'POST',
                body: JSON.stringify(editedPrestataire),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        navigate('/show/prestataires');
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
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
