import React, { FunctionComponent, useEffect, useState } from 'react'
import "./Home.scss"
const Home: FunctionComponent = () => {
  const [conventions, setConventions] = useState([]);
  const [paiements, setPaiements] = useState([]);
  // This method fetches the conventions from the database.
  useEffect(() => {
    async function getConventions() {
      const response = await fetch(`http://localhost:5000/convention/list`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const conventions = await response.json();
      setConventions(conventions);
    }
    getConventions();
    return;
  }, [conventions.length]);
  useEffect(() => {
    async function getPaiements() {
      const response = await fetch(`http://localhost:5000/paiement/list`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const paiements = await response.json();
      setPaiements(paiements);
    }
    getPaiements();
    return;
  }, [paiements.length]);

  return (
    <div className="appGestion">
      <h1>Gestion DiRVED</h1>
      <h2>Conventions enregistré {conventions.length}</h2>
      <h2>Paiement enregistré {paiements.length}</h2>
    </div>
  )
}

export default Home
