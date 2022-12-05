import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        num_operation: "",
        nom_responsable: "",
        date_debut: "",
        date_fin: "",
        montant: "",
        montant_encaisse: "",
        piece_jointes: [],
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", position: "", level: "" });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Ajouter une convention</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="num_operation">Numéro d'opération</label>
                    <input
                        type="text"
                        className="form-control"
                        id="num_operation"
                        value={form.num_operation}
                        onChange={(e) => updateForm({ num_operation: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nom_responsable">Responsable</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom_responsable"
                        value={form.nom_responsable}
                        onChange={(e) => updateForm({ nom_responsable: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date_debut">Date de début</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date_debut"
                        value={form.date_debut}
                        onChange={(e) => updateForm({ date_debut: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date_fin">Date de fin</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date_fin"
                        value={form.date_fin}
                        onChange={(e) => updateForm({ date_fin: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="montant">Montant</label>
                    <input
                        type="number"
                        min="0"
                        step="any"
                        className="form-control"
                        id="montant"
                        value={form.montant}
                        onChange={(e) => updateForm({ montant: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Ajouter conventions"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}