import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: FunctionComponent = () => {
  const [conventions, setConventions] = useState([]);
  const [prestations, setPrestations] = useState([]);
  // This method fetches the conventions from the database.
  useEffect(() => {
    async function getConventions() {
      const response = await fetch(`http://localhost:5000/show/conventions`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const conventionsRes = await response.json();
      setConventions(conventionsRes);
    }
    getConventions();
  }, [conventions.length]);
  useEffect(() => {
    async function getPrestations() {
      const response = await fetch(`http://localhost:5000/show/prestations`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const prestationsRes = await response.json();
      setPrestations(prestationsRes);
    }
    getPrestations();
  }, [prestations.length]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Gestion DiRVED</h1>
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-8">
            <Link to="/show/conventions/category">
              <div className="stat">
                <div className="stat-title uppercase">
                  Conventions enregistré{' '}
                </div>
                <div className="stat-value">{conventions.length}</div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
              </div>
            </Link>
            <div className="stat">
              <div className="stat-title uppercase">Prestation enregistré</div>
              <div className="stat-value">{prestations.length}</div>
              {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
