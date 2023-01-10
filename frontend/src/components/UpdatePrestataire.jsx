import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdatePrestataire() {
    const [form, setForm] = useState({
        pre_nom: '',
        pre_type: '',
        pre_adresse: '',
        pre_telephone: '',
        pre_email: '',
        pre_rib: '',
        pre_kbis: '',
    });

    const params = useParams();
    const navigate = useNavigate();

    // This method fetches the prestataires from the database.
    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/show/prestataire/${params.id.toString()}`);

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

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPrestataire = {
            pre_nom: form.pre_nom,
            pre_type: form.pre_type,
            pre_adresse: form.pre_adresse,
            pre_telephone: form.pre_telephone,
            pre_email: form.pre_email,
            pre_rib: form.pre_rib,
            pre_kbis: form.pre_kbis,
            pre_commentaire: form.pre_commentaire,

        };
        navigate('/show/prestataires');

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
    }

    return (
        <div className='card card-body bg-base-100 shadow-xl'>
            <h2 className="card-title">Modifier prestataire</h2>
            <fieldset className='form-group' >
                <legend className="card-title">Prestataire</legend>
                <form onSubmit={onSubmit} method='post' encType='multipart/form-data' >
                    <div className='form-group' >
                        <label className='label' htmlFor='pre_nom'>Nom</label>
                        <input
                            className='input input-bordered input-sm w-full max-w-xs'
                            type='text'

                            id='pre_nom'
                            value={form.pre_nom}
                            onChange={(e) => updateForm({ pre_nom: e.target.value })}
                        />
                    </div>
                    <div className='form-group' >
                        <label className='label' htmlFor='pre_type'>Type</label>
                        <input
                            className='input input-bordered input-sm w-full max-w-xs'
                            type='text'

                            id='pre_type'
                            value={form.pre_type}
                            onChange={(e) => updateForm({ pre_type: e.target.value })}
                        />
                    </div>
                    <div className='form-group' >
                        <label className='label' htmlFor='pre_adresse'>Adresse</label>
                        <input
                            className='input input-bordered input-sm w-full max-w-xs'
                            type='text'

                            id='pre_adresse'
                            value={form.pre_adresse}
                            onChange={(e) => updateForm({ pre_adresse: e.target.value })}
                        />
                    </div>
                    <div className='form-group' >
                        <label className='label' htmlFor='pre_telephone'>Telephone</label>
                        <input
                            className='input input-bordered input-sm w-full max-w-xs'
                            type='text'

                            id='pre_telephone'
                            value={form.pre_telephone}
                            onChange={(e) => updateForm({ pre_telephone: e.target.value })}
                        />
                    </div>
                    <div className='form-group' >
                        <label className='label' htmlFor='pre_email'>Email</label>
                        <input
                            className='input input-bordered input-sm w-full max-w-xs'
                            type='email'

                            id='pre_email'
                            value={form.pre_email}
                            onChange={(e) => updateForm({ pre_email: e.target.value })}
                        />
                    </div>
                    {/* TODO Gérer mise à jour des documents */}
                    <div className='form-group' >
                        <label className='label' htmlFor='pre_rib'>RIB</label>
                        <p>{form.pre_rib.pre_rib_old_file_name}</p>
                        <input
                            className="file-input file-input-sm w-full max-w-xs"
                            name='pre_rib'
                            type='file'

                            id='pre_rib'
                            onChange={(e) => updateForm({ pre_rib: e.target.files })}
                            disabled
                        />
                    </div>
                    <div className='form-group' >
                        <label className='label' htmlFor='pre_kbis'>KBIS</label>
                        <p>{form.pre_kbis.pre_kbis_old_file_name} </p>
                        <input
                            type='file'
                            className="file-input file-input-sm w-full max-w-xs"
                            id='pre_kbis'
                            disabled
                        />
                    </div>
                    <div >
                        <input
                            type='submit'
                            value='Mise à jour'
                            className='btn btn-warning btn-sm mt-4 mb-4'
                        />
                    </div>
                </form>
            </fieldset >
        </div >
    );
}
