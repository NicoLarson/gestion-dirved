import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../assets/css/reset.css';
import '../assets/css/theme.css';
import '../assets/css/style.css';
import './App.scss';

import Navbar from '../components/Navbar';
import Home from '../pages/Home/Home';
import ConventionList from '../components/ConventionList';
import CreateConvention from '../components/AddConvention';
import AddResponsable from '../components/AddResponsable';
import ShowResponsable from '../components/ShowResponsable';

export default function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="display">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convention/create" element={<CreateConvention />} />
          <Route path="/convention/list" element={<ConventionList />} />
          <Route
            path="/convention/add/responsable"
            element={<AddResponsable />}
          />
          <Route
            path="/convention/show/responsable"
            element={<ShowResponsable />}
          />
        </Routes>
      </div>
    </Router>
  );
}
