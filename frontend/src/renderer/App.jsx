import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../../dist/output.css';
import './App.scss';

import Navbar from '../components/Navbar';
import Home from '../pages/Home/Home';

import ShowConventions from '../components/ShowConventions';
import ShowConventionDetail from '../components/ShowConventionDetail';
import CreateConvention from '../components/CreateConvention';
import UpdateConvention from '../components/UpdateConvention';
import ShowConventionsCountCategory from '../components/ShowConventionsCountCategory';
import ShowConventionsByCategory from '../components/ShowConventionsByCategory';

import ShowPrestations from '../components/ShowPrestations';
import CreatePrestation from '../components/CreatePrestation';
import UpdatePrestation from '../components/UpdatePrestation';

import AddResponsable from '../components/AddResponsable';
import ShowResponsable from '../components/ShowResponsables';
import UpdateResponsable from '../components/UpdateResponsable';

import CreatePrestataire from '../components/CreatePrestataire';
import ShowPrestataires from '../components/ShowPrestataires';
import UpdatePrestataire from '../components/UpdatePrestataire';

import OpenFile from '../components/OpenFile';

export default function App() {
  return (
    <Router>
      <Navbar className="fixed" />
      <div className="display w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Convention */}
          <Route path="/show/conventions" element={<ShowConventions />} />
          <Route
            path="/show/conventions/category"
            element={<ShowConventionsCountCategory />}
          />
          <Route
            path="/show/conventionsbycategory/:category"
            element={<ShowConventionsByCategory />}
          />
          <Route
            path="/show/convention/:id"
            element={<ShowConventionDetail />}
          />
          <Route path="/create/convention" element={<CreateConvention />} />
          <Route path="/update/convention/:id" element={<UpdateConvention />} />
          {/* Prestataire */}
          <Route path="/create/prestataire" element={<CreatePrestataire />} />
          <Route path="/show/prestataires" element={<ShowPrestataires />} />
          <Route
            path="/update/prestataire/:id"
            element={<UpdatePrestataire />}
          />
          {/* Prestation */}
          <Route path="/show/prestations" element={<ShowPrestations />} />
          <Route path="/create/prestation" element={<CreatePrestation />} />
          <Route path="/update/prestation/:id" element={<UpdatePrestation />} />

          {/* Responsable */}
          <Route
            path="/convention/add/responsable"
            element={<AddResponsable />}
          />
          <Route
            path="/convention/show/responsables"
            element={<ShowResponsable />}
          />
          <Route
            path="/convention/update/responsable/:id"
            element={<UpdateResponsable />}
          />

          {/* OpenFile */}
          <Route path="/openfile/:path" element={<OpenFile />} />
        </Routes>
      </div>
    </Router>
  );
}
