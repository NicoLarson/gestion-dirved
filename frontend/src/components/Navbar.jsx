import React from 'react';
// We import NavLink to utilize the react router.
import { NavLink } from 'react-router-dom';

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <NavLink to="/">
        <img
          alt="logo"
          className="logo h-16 p-2"
          src="https://www.daeu.fr/app/uploads/2018/11/Universite-de-Guyane_logo.png"
        />
      </NavLink>

      <nav>
        <ul className="menu w-56 p-2 rounded-box">
          <li className="menu-title">
            <span>Convention</span>
          </li>
          <li>
            <NavLink to="/show/conventions/category">
              <i className="fa-solid fa-list" /> Afficher
            </NavLink>
          </li>
          <li>
            <NavLink to="/create/convention">
              <i className="fa-solid fa-plus" /> Ajouter
            </NavLink>
          </li>
          <li className="menu-title">
            <span>Prestations</span>
          </li>
          <li>
            <NavLink to="/show/prestations">
              <i className="fa-solid fa-list" /> Afficher
            </NavLink>
          </li>
          <li>
            <NavLink to="/show/prestataires">
              <i className="fa-solid fa-list" /> Prestataires
            </NavLink>
          </li>
          <li>
            <NavLink to="/create/prestation">
              <i className="fa-solid fa-plus" /> Ajouter
            </NavLink>
          </li>
          <li>
            <NavLink to="/create/prestataire">
              <i className="fa-solid fa-plus" /> Prestataire
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="invisible-block" />
    </div>
  );
}
