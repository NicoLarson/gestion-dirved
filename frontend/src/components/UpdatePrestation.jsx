import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import "./UpdatePrestation.scss"

// TODO AJOUTER CHAMP Montant
export default function UpdatePrestation() {
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

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(
                `http://localhost:5000/show/prestation/${params.id.toString()}`
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
            console.log(record);

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
        const editedPrestation = {
            pai_num_operation: form.pai_num_operation,
            pai_prestataire: form.pai_prestataire,
            pai_devis_piece_jointe: form.pai_devis_piece_jointe,
            pai_devis_status: form.pai_devis_status,
            pai_bc_piece_jointe: form.pai_bc_piece_jointe,
            pai_bc_status: form.pai_bc_status,
            pai_facture_piece_jointe: form.pai_facture_piece_jointe,
            pai_facture_status: form.pai_facture_status,
            pai_csf_piece_jointe: form.pai_csf_piece_jointe,
            pai_csf_status: form.pai_csf_status,
            pai_commentaire: form.pai_commentaire,

        };
        navigate('/show/prestations');

        // This will send a post request to update the data in the database.
        await fetch(
            `http://localhost:5000/update/prestation/${params.id}`,
            {
                method: 'POST',
                body: JSON.stringify(editedPrestation),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div className='UpdatePrestation'>
            <h2>Modifier Prestation</h2>
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
