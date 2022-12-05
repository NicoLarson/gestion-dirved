import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../assets/css/reset.css';
import '../assets/css/theme.css';
import '../assets/css/style.css';
import './App.scss';

import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home/Home';
import ConventionList from '../components/ConventionList/ConventionList'
import CreateConvention from '../components/CreateConvention/CreateConvention'
export default function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className='display'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convention/create" element={<CreateConvention />} />
          <Route path="/convention/list" element={<ConventionList />} />
        </Routes>
      </div>
    </Router>
  )
}