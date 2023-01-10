import { useNavigate } from 'react-router';

export default function CreatePrestataire() {
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form);
        const pre_nom = formData.get('pre_nom');
        const pre_type = formData.get('pre_type');
        const pre_adresse = formData.get('pre_adresse');
        const pre_telephone = formData.get('pre_telephone');
        const pre_email = formData.get('pre_email');
        const pre_rib = formData.get('pre_rib');
        const pre_kbis = formData.get('pre_kbis');
        const pre_description = formData.get('pre_description');
        const data = {
            pre_nom,
            pre_type,
            pre_adresse,
            pre_telephone,
            pre_email,
            pre_rib,
            pre_rib_file_name: pre_rib.name,
            pre_rib_file_path: pre_rib.path,
            pre_kbis,
            pre_kbis_file_name: pre_kbis.name,
            pre_kbis_file_path: pre_kbis.path,
            pre_description
        }

        await fetch('http://localhost:5000/create/prestataire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).catch((error) => {
            window.alert(error);
            return;
        });
        navigate('/');


    }

    return (
        <div className='card card-body bg-base-100 shadow-xl'>
            <h2 className="card-title">Ajouter Prestataire</h2>
            <fieldset className='form-group'>
                <legend className="card-title">Prestataire</legend>
                <form onSubmit={handleFormSubmit} method="post" className='form-group row'>
                    <div className='form-control'>
                        <label htmlFor="pre_nom">Nom</label>
                        <input
                            className='input input-bordered input-sm w-full '
                            name="pre_nom"
                            type="text"

                            id="pre_nom" />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="pre_type">Type</label>
                        <input
                            className='input input-bordered input-sm w-full '
                            name="pre_type"
                            type="text"

                            id="pre_type"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="pre_adresse">Adresse</label>
                        <input
                            className='input input-bordered input-sm w-full '
                            name="pre_adresse"
                            type="text"

                            id="pre_adresse"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="pre_telephone">Telephone</label>
                        <input
                            className='input input-bordered input-sm w-full '
                            name="pre_telephone"
                            type="text"

                            id="pre_telephone"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="pre_email">Email</label>
                        <input
                            className='input input-bordered input-sm w-full '
                            name="pre_email"
                            type="email"

                            id="pre_email"
                        />
                    </div>
                    {/* TODO Drag and drop file upload */}
                    <div className='form-control'>
                        <label htmlFor="pre_rib">RIB</label>
                        <input
                            className="file-input file-input-sm w-full max-w-xs"
                            name="pre_rib"
                            type="file"
                            id="pre_rib"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="pre_kbis">KBIS</label>
                        <input
                            className="file-input file-input-sm w-full max-w-xs"
                            name="pre_kbis"
                            type="file"
                            id="pre_kbis"
                        />
                    </div>
                    <div className='form-control' >
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className='textarea textarea-bordered' name="pre_description"
                            id="pre_description"></textarea>
                    </div>
                    <div >
                        <input
                            className='btn btn-primary btn-sm mt-4 mb-4'
                            type="submit"
                            value="Ajouter"
                        />
                    </div>
                </form>
            </fieldset >
        </div >
    );
}
