import React from 'react';
import './Navbar.scss';
// We import NavLink to utilize the react router.
import { NavLink } from 'react-router-dom';

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <NavLink className="navbar-brand" to="/">
          <img src="https://www.daeu.fr/app/uploads/2018/11/Universite-de-Guyane_logo.png"></img>
        </NavLink>
        <h2>Conventions</h2>
        <ul>
          <li className="nav-item">
            <NavLink className="button btn btn-info" to="/create">
              Rechercher
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="button btn btn-success" to="/convention/list">
              Afficher
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="button btn btn-primary" to="/convention/create">
              Ajouter
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="button btn btn-warning" to="/create">
              Mise à jour
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="button btn btn-danger"
              to="/convention/search/delete"
            >
              Supprimer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="button btn btn-danger"
              to="/convention/add/responsable"
            >
              Ajouter <br />
              Responsable
            </NavLink>
          </li>
        </ul>
        <h2>Paiements</h2>
        <ul>
          <li className="nav-item">
            <NavLink className="button btn btn-info" to="/create">
              Rechercher
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="button btn btn-success" to="/create">
              Afficher
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="button btn btn-primary" to="/create">
              Ajouter
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="button btn btn-warning" to="/create">
              Mise à jour
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="button btn btn-danger"
              to="/convention/search/delete"
            >
              Supprimer
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
