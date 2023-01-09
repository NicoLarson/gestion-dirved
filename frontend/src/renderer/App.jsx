import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import '../../dist/output.css'
import './App.scss'

import Navbar from '../components/Navbar'
import Home from '../pages/Home/Home'

import ShowConventions from '../components/ShowConventions'
import CreateConvention from '../components/CreateConvention'
import UpdateConvention from '../components/UpdateConvention'

import ShowPrestations from '../components/ShowPrestations'
import CreatePrestation from '../components/CreatePrestation'
import UpdatePrestation from '../components/UpdatePrestation'

import AddResponsable from '../components/AddResponsable'
import ShowResponsable from '../components/ShowResponsables'
import UpdateResponsable from '../components/UpdateResponsable'

import CreatePrestataire from '../components/CreatePrestataire'
import ShowPrestataires from '../components/ShowPrestataires'
import UpdatePrestataire from '../components/UpdatePrestataire'

export default function App() {
  return (
    <Router>
      <Navbar className="fixed"></Navbar>
      <div className="display">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Convention */}
          <Route path="/show/conventions" element={<ShowConventions />} />
          <Route path="/create/convention" element={<CreateConvention />} />
          <Route path="/update/convention/:id" element={<UpdateConvention />} />
          {/* Prestataire */}
          <Route path="/create/prestataire" element={<CreatePrestataire />} />
          <Route path="/show/prestataires" element={<ShowPrestataires />} />
          <Route path="/update/prestataire/:id" element={<UpdatePrestataire />} />
          {/* Prestation */}
          <Route path="/show/prestations" element={<ShowPrestations />} />
          <Route path="/create/prestation" element={<CreatePrestation />} />
          <Route path="/update/prestation/:id" element={<UpdatePrestation />} />

          {/* Responsable */}
          <Route path="/convention/add/responsable" element={<AddResponsable />} />
          <Route path="/convention/show/responsables" element={<ShowResponsable />} />
          <Route path="/convention/update/responsable/:id" element={<UpdateResponsable />} />

        </Routes>
      </div>
    </Router>
  )
}
