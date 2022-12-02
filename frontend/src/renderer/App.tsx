import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../assets/css/reset.css';
import '../assets/css/theme.css';
import '../assets/css/style.css';
import './App.css';
import React, { useState, useEffect } from 'react';
// import Conventions from '../models/conventions';
import DisplayConventions from '../components/DisplayConventions/DisplayConventions';

const AppGestion = () => {
  const [title, setTitle] = useState<string>('Gestion DiRVED');
  const [fetchedData, updateFetchedData] = useState([]);

  const api = 'http://localhost:5000/conventions';
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => updateFetchedData(data));
  }, []);

  return (
    <div className="appGestion">
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        <h2>Il y a {fetchedData.length} convention</h2>
        <DisplayConventions conventions={fetchedData} />
      </main>
      <footer>Info</footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppGestion />} />
      </Routes>
    </Router>
  );
}
