import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import './CreatePrestation.scss'
import axios from "axios";
// TODO Gérer les champs (obligatoires, format, etc.)
// TODO ajouter champ montant
const CreatePrestation = () => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target
    const formData = new FormData(form);
    const numOpe = formData.get('numOpe');
    const devisFile = formData.get('devisFile');
    const data = {
      numOpe,
      devisFileName: devisFile.name,
      devisFilePath: devisFile.path
    }
    axios.post('http://localhost:5000/test_upload', data)
      .then(res => {
        console.log(res);
      }
      )
      .catch(err => {
        console.log(err);
      }
      )
  }

  return (
    <div className='CreatePrestation'>
      <h2>Ajouter Prestation</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="pai_num_operation">Numéro d'opération</label>
          <input
            name="pai_num_operation"
            id="pai_num_operation"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pai_prestataire">Prestataire</label>
          <select name="pai_prestataire" id="pai_prestataire">
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
          />
        </div>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  )
}

export default CreatePrestation