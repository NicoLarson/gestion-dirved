import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import dateFormat, { masks } from "dateformat";

export default function UpdateConvention() {
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

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(
                `http://localhost:5000/show/convention/${params.id.toString()}`
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
        const editedConvention = {
            con_num_operation: form.con_num_operation,
            con_nom_operation: form.con_nom_operation,
            con_responsable: {
                con_nom_responsable: form.con_nom_responsable,
                con_prenom_responsable: form.con_prenom_responsable,
                con_fonction: form.con_fonction,
                con_email_responsable: form.con_email_responsable,
            },
            con_date_debut: form.con_date_debut,
            con_date_fin: form.con_date_fin,
            con_montant: form.con_montant,
            con_montant_encaisse: form.con_montant_encaisse,
            con_piece_jointes: [],
            con_categories: form.con_categories,
            con_partenaires: form.con_partenaires,
        };

        // This will send a post request to update the data in the database.
        await fetch(
            `http://localhost:5000/update/convention/${params.id}`,
            {
                method: 'POST',
                body: JSON.stringify(editedConvention),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        navigate('/show/conventions');
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h2>Modifier Convention</h2>
            <fieldset className='form-group'>
                <legend>Convention</legend>
                <form onSubmit={onSubmit} method="post" enctype="multipart/form-data" className='form-group row'>
                    <div className="form-group">
                        <label htmlFor="con_num_operation">Numéro d'opération</label>
                        <input
                            type="text"
                            className="form-control"
                            id="con_num_operation"
                            value={form.con_num_operation}
                            onChange={(e) => updateForm({ con_num_operation: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="con_nom_operation">Opération</label>
                        <input
                            type="text"
                            className="form-control"
                            id="con_nom_operation"
                            value={form.con_nom_operation}
                            onChange={(e) => updateForm({ con_nom_operation: e.target.value })}
                        />
                    </div>
                    <fieldset className='form-group'>
                        <legend>Responsable</legend>
                        <div className="form-group">
                            <label htmlFor="con_nom_responsable">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_nom_responsable"
                                value={form.con_nom_responsable}
                                onChange={(e) => updateForm({ con_nom_responsable: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="con_prenom_responsable">Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_prenom_responsable"
                                value={form.con_prenom_responsable}
                                onChange={(e) => updateForm({ con_prenom_responsable: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="con_fonction_responsable">Fonction</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_fonction_responsable"
                                value={form.con_fonction_responsable}
                                onChange={(e) => updateForm({ con_fonction_responsable: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="con_email_responsable">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_email_responsable"
                                value={form.con_email_responsable}
                                onChange={(e) => updateForm({ con_email_responsable: e.target.value })}
                            />
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <label htmlFor="con_date_debut">Date de début</label>
                        <input
                            type="date"
                            className="form-control"
                            id="con_date_debut"
                            value={form.con_date_debut}
                            onChange={(e) => updateForm({ con_date_debut: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="con_date_fin">Date de fin</label>
                        <input
                            type="date"
                            className="form-control"
                            id="con_date_fin"
                            value={form.con_date_fin}
                            onChange={(e) => updateForm({ con_date_fin: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="con_montant">Montant</label>
                        <input
                            type="number"
                            min="0"
                            step="any"
                            className="form-control"
                            id="con_montant"
                            value={form.con_montant}
                            onChange={(e) => updateForm({ con_montant: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="con_montant_encaisse">Montant encaissé</label>
                        <input
                            type="number"
                            min="0"
                            step="any"
                            className="form-control"
                            id="con_montant_encaisse"
                            value={form.con_montant_encaisse}
                            onChange={(e) => updateForm({ con_montant_encaisse: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="con_piece_jointes">Pièce jointe</label>
                        <input
                            name="con_piece_jointes"
                            type="file"
                            className="form-control"
                            id="con_piece_jointes"
                            value={form.con_piece_jointes}
                            onChange={(e) => updateForm({ con_piece_jointes: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="con_categories">Catégorie</label>
                        <input
                            type="text"
                            className="form-control"
                            id="con_categories"
                            value={form.con_categories}
                            onChange={(e) => updateForm({ con_categories: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="con_partenaires">Partenaire</label>
                        <input
                            type="text"
                            className="form-control"
                            id="con_partenaires"
                            value={form.con_partenaires}
                            onChange={(e) => updateForm({ con_partenaires: e.target.value })}
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
