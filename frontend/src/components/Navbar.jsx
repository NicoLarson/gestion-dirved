import React from 'react';
import './Navbar.scss';
// We import NavLink to utilize the react router.
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <NavLink className="navbar-brand" to="/">
          <img className='logo' src="https://www.daeu.fr/app/uploads/2018/11/Universite-de-Guyane_logo.png"></img>
        </NavLink>
        <dl className='menu'>
          <dt><i className="fa-solid fa-flask"></i> Conventions</dt>
          <dd>
            <ul>
              <li className="nav-item">
                <NavLink className="nav-link" to="/show/conventions">
                  <i className="fa-solid fa-list"></i> Afficher
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create/convention">
                  <i className="fa-solid fa-plus"></i> Ajouter
                </NavLink>
              </li>
            </ul>
          </dd>
          <dt><i className="fa-solid fa-money-bill-1-wave"></i> Prestations</dt>
          <dd>  <ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/show/prestations">
                <i className="fa-solid fa-list"></i> Afficher
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/show/prestataires">
                <i className="fa-solid fa-list"></i> Prestataires
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create/prestation">
                <i className="fa-solid fa-plus"></i> Ajouter
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create/prestataire">
                <i className="fa-solid fa-plus"></i> Prestataire
              </NavLink>
            </li>
          </ul></dd>
        </dl>
      </nav>
      <div className="invisible-block"></div>
    </div>

  );
}
