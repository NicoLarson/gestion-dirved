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
        <div className='CreatePrestataire'>
            <h2>Ajouter Prestataire</h2>
            <fieldset className='form-group'>
                <legend>Prestataire</legend>
                <form onSubmit={handleFormSubmit} method="post" className='form-group row'>
                    <div className="form-group">
                        <label htmlFor="pre_nom">Nom</label>
                        <input
                            name="pre_nom"
                            type="text"
                            className="form-control"
                            id="pre_nom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_type">Type</label>
                        <input
                            name="pre_type"
                            type="text"
                            className="form-control"
                            id="pre_type"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_adresse">Adresse</label>
                        <input
                            name="pre_adresse"
                            type="text"
                            className="form-control"
                            id="pre_adresse"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_telephone">Telephone</label>
                        <input
                            name="pre_telephone"
                            type="text"
                            className="form-control"
                            id="pre_telephone"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_email">Email</label>
                        <input
                            name="pre_email"
                            type="email"
                            className="form-control"
                            id="pre_email"
                        />
                    </div>
                    {/* TODO Drag and drop file upload */}
                    <div className="form-group">
                        <label htmlFor="pre_rib">RIB</label>
                        <input
                            name="pre_rib"
                            type="file"
                            className="form-control"
                            id="pre_rib"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pre_kbis">KBIS</label>
                        <input
                            name="pre_kbis"
                            type="file"
                            className="form-control"
                            id="pre_kbis"
                        />
                    </div>
                    <div className="form-group textarea-container">
                        <label htmlFor="pre_description">Description</label>
                        <textarea name="pre_description" id="pre_description" rows="10"></textarea>
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
