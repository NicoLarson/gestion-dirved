import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateResponsable() {
    const [form, setForm] = useState({
        res_nom: '',
        res_prenom: '',
        res_email: '',
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(
                `http://localhost:5000/show/responsable/${params.id.toString()}`
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
        const editedResponsable = {
            res_nom: form.res_nom,
            res_prenom: form.res_prenom,
            res_email: form.res_email,
        };

        // This will send a post request to update the data in the database.
        await fetch(
            `http://localhost:5000/update/responsable/${params.id}`,
            {
                method: 'POST',
                body: JSON.stringify(editedResponsable),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        navigate('/convention/show/responsables');
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="res_nom">Nom: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="res_nom"
                        value={form.res_nom}
                        onChange={(e) => updateForm({ res_nom: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="res_prenom">Prénom: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="res_prenom"
                        value={form.res_prenom}
                        onChange={(e) => updateForm({ res_prenom: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="res_email">Email: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="res_email"
                        value={form.res_email}
                        onChange={(e) => updateForm({ res_email: e.target.value })}
                    />
                </div>

                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form >
        </div >
    );
}
