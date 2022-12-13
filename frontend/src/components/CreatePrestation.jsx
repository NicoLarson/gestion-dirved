import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import './CreatePrestation.scss'
import axios from "axios";
// TODO Gérer les champs (obligatoires, format, etc.)
// TODO ajouter champ montant
const CreatePrestation = () => {
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
    <Fragment>
      <h1>Créer une prestation</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="pai_num_operation">Numéro d'opération</label>
          <input
            name="pai_num_operation"
            id="pai_num_operation"
            type="text"
            className="form-control"
          />
          <label htmlFor="devisFile">DEVIS</label>
          <input
            name="devisFile"
            id="devisFile"
            type="file"
            className="form-control"
          />
        </div>
        <input type="submit" value="Envoyer" />
      </form>
    </Fragment>
  )
}

export default CreatePrestation