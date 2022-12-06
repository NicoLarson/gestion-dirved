import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";

export default function AddConvention() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it


  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Ajouter une convention</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="con_num_operation">Numéro d'opération</label>
          <input
            {...register("num_operation")}
            className="form-control"
            id="num_operation"
          />
        </div>
        <div>
          <label htmlFor="con_num_operation">Opération</label>
          <input
            {...register("con_num_operation")}
            className="form-control"
            id="con_num_operation"
          />
        </div>
        <div>
          <h3>Responsable</h3>
          <div>
            <label htmlFor="con_nom_responsable">Nom</label>
            <input
              {...register("con_nom_responsable", { required: true })}
              className="form-control"
              id="con_nom_responsable"
            />
          </div>
          <div>
            <label htmlFor="con_prenom_responsable">Prénom</label>
            <input
              {...register("con_prenom_responsable", { required: true })}
              className="form-control"
              id="con_prenom_responsable"
            />
          </div>
          <div>
            <label htmlFor="con_email_responsable">Email</label>
            <input
              {...register("con_email_responsable", { required: true })}
              className="form-control"
              id="con_email_responsable"
            />
          </div>

        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
