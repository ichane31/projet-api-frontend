// Import Parse minified version
import React, { useEffect, useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import Navbar from './components/Navbar';
import Nav from './components/Nav';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import { BreadCrumb } from 'primereact/breadcrumb';
import Login from './pages/Login';
import Register from './pages/auth/Register';
import EmailSend  from './pages/auth/EmailSend';
import ForgotPassword from './pages/auth/ForgotPassword';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import WhyToSub from './components/WhyToSub';
import Categories from './pages/Categories';
import Projets from './pages/Projets/Projets';
import ProjetByCategory from './pages/Projets/ProjetByCategory';
import NewProjet from './pages/Projets/NewProjet';
import ProjetDetail from './pages/Projets/ProjetDetail';
import LatestProjets from './pages/Projets/LatestProjets';
import Profile from './pages/Profile';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'PYP4BbVFq63rSa0VOuXfNDejnWE2312oShVbZZwy';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'TxuZROQIB2LkBddlwHZoO0d9kefxdv1v13jV3YCt';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [path, setPath] = useState([{label: window.location.pathname.substring(1)}]);

  useEffect(() => {
    setPath([{label: window.location.pathname.substring(1)}]);        
}, []);

  return (
  <div>
    <BrowserRouter>
      <div className=" bg-white">
        <Navbar />
      </div>
       {/* <Nav/>  */}
       {/* <div className="card">
          <BreadCrumb className="bg-gray-700" />
        </div> */}

      <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/Contact" element={<Contact />}/ >
        <Route path="/forgetPassword" element={<ForgotPassword />}/ >
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Categories" element={<Categories />}/>
        <Route path="/:id/Projet" element={<Projets />}/>
        <Route path="/:id/ProjetByCategory" element={<ProjetByCategory />}/>
        <Route path="/NewProjet" element={<NewProjet />}/>
        <Route path="/:id/ProjetDetail" element={<ProjetDetail />}/>
        <Route path="/Acceuil" element={<LatestProjets />}/>
        <Route path="/:userEmail/emailSend" element={<EmailSend />}/>
        <Route path="Profile" element={<Profile />} />
      </Routes>
      <WhyToSub/>
      <Footer/>
    </BrowserRouter>

  </div>
  );
}

export default App;
