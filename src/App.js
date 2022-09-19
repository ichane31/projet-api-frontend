// Import Parse minified version
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NavBarBoost from './components/NavBarBoost';
import Nav from './components/Nav';
import {BrowserRouter , Routes , Route ,Navigate ,useLocation } from "react-router-dom";
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
import FirstPage from './pages/FirstPage';
import { useAuth} from './hoc/useAuth'; 
import EditorComponent from './components/EditorComponent';
import CommentForm from './components/CommentsFolder/CommentForm';
import PageNotFound from './pages/PageNotFound';
import ResetPassword from './pages/auth/ResetPassword';
import PasswordEmailSend from './pages/auth/PasswordEmailSend';
import AccountSetting from './pages/AccountSetting';
import FavSuggest from './pages/FavSuggest';
import Verification from './components/Verification';
import Search from './components/Search';
import SearchResults from './pages/SearchResults'

function App() {
  const [path, setPath] = useState([{label: window.location.pathname.substring(1)}]);
  const {user } = useAuth();
  

  useEffect(() => {
    setPath([{label: window.location.pathname.substring(1)}]);        
}, []);

  return (
  <div>
    <BrowserRouter>
      <div className="">
        {user ? 
        <NavBarBoost />:
        <Navbar /> 
        }
      </div>
       
   <div className="main">

   {user && Object.keys(user).length ? 
   <Routes>
   <Route path="/" element={<FirstPage />}/>
   <Route path="/Contact" element={<Contact />}/ >
     <Route path="/Categories" element={<Categories />}/>
     <Route path="/:id/Projet" element={<Projets />}/>
     <Route path="/Categories/:id/ProjetByCategory" element={<ProjetByCategory />}/>
     <Route path="/NewProjet" element={<NewProjet />}/>
     <Route path="/:id/ProjetDetail" element={<ProjetDetail />}/>
     <Route path="/Acceuil" element={<LatestProjets />}/>
     <Route path="/:userEmail/emailSend" element={<EmailSend />}/>
     <Route path="/Profile" element={<Profile />} />
     <Route path="ProfileSetting" element={<AccountSetting />} />
     <Route path="/MesFavoris" element={<FavSuggest />} />
     <Route path="/Results" element={<SearchResults />} />
      {/* <Route path="/search" element={<Search />} />  */}
   </Routes>
   :
   <Routes>
      <Route path="/" element={<FirstPage />}/>  
        <Route path="/Categories" element={<Verification />}/>
        <Route path="/Categories/:id/ProjetByCategory" element={<Verification/>}/>
        <Route path="/NewProjet" element={<Verification />}/>
        <Route path="/:id/ProjetDetail" element={<Verification />}/>
        <Route path="/:userEmail/emailSend" element={<EmailSend />}/>
        <Route path="/ProfileSetting" element={<Verification />} />
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/forgetPassword" element={<ForgotPassword/>}/>
        <Route path="/:token/resetPassword" element={<ResetPassword/>}/>
        <Route path="/Password/:email/Passwordemailsend" element={<PasswordEmailSend/>}/>
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/MesFavoris" element={<Login />} />
        <Route path="verification" element={<Verification />} />
        <Route path="/Acceuil" element={<Verification />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/Results" element={<SearchResults />} /> */}
        
      </Routes>
   }
       
      </div>
      <WhyToSub/>
      <Footer/>
    </BrowserRouter>

  </div>
  );
}

export default App;
