import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../data/logo.png';
import lablib from '../data/Lablib_Projet.png';
import lablib2 from '../data/projetS.png';
import '../css/App.css'
import {GetCategory} from '../services/CategoryService';
import UserProfile from './UserProfile';
import React , {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {useStateContext} from '../contexts/ContextProvider';
import {useAuth} from '../hoc/useAuth';
import userImage from '../data/user.jpg';;
import { Link  , useNavigate , useLocation} from 'react-router-dom';



const url = 'https://projet-apis.herokuapp.com/api/v1/file';
const NavBarBoost = () => {

    const url = 'https://projet-apis.herokuapp.com/api/v1/file';    
    const {handleClick , isClicked } = useStateContext();
    const [categories, setCategories] = useState([]);
    const {user} = useAuth();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const path = window.location.pathname;
    
    const nav = () => {
        navigate(`/Results?q=${search}`);
    }
    useEffect(() => {
        GetCategory().then(data => {
            setCategories(data);
        });
        
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const handleClick = () => {
    //     setIsClicked(isClicked => !isClicked);
    //     console.log(isClicked)
    // }
    

  return (
    <div className="navBoot" >
        <Navbar fixed='top' offcanvasnavbar='true' expand="lg" bg="white" variant="light" className=" mb-5 d-flex justify-content-between align-items-center border-b-1 shadow-md"  >
            <Container fluid className="d-flex containerNav">
                <Navbar.Brand className="" href="/"><img src={lablib2} alt="logo" width={75} height={50}/></Navbar.Brand>
                <Navbar.Toggle aria-controls='offcanvasnavbar-expand-lg' />
                <Navbar.Offcanvas
                    id='offcanvasnavbar-expand-lg'
                    // aria-labelledby='offcanvasnavbarLabel-expand-$lg'
                     placement="end"
                     className="  row"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id='offcanvasnavbarLabel-expand-lg'>
                           Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav className="navAcc me-auto mt-2" >
                        <Nav.Link eventkey={1.1} className=" item d-flex  hover:text-blue-800" href="/Acceuil">  Acceuil</Nav.Link>
                        {user && (
                            <NavDropdown className=" text-dark" eventkey={1.2}  title='Catégories'  id="offcanvasnavbarDropdown-expand-lg" 
                        
                            >
                               <NavDropdown.Item eventKey={1.3} href={`/Categories`}>Toutes les catégories</NavDropdown.Item>
                                  {categories.map(
                                            e => <NavDropdown.Item eventKey={e.id} href={`/Categories/${e.id}/ProjetByCategory`}>{e.name}</NavDropdown.Item>
                                        )}
                               
                            </NavDropdown>    
                        )}
                        <Nav.Link eventkey={1.4} className=" item  " href="/Contact"> Contact</Nav.Link>
                    </Nav>
                    {user && (
                        <Form className=" row mt-2  searchbar d-flex">
                           <div className="input-group search-box ">
                                <input type="seach" className='  form-control text-black focus:bg-gray-700'  aria-label='Search' 
                                    placeholder='Chercher ici .....'
                                    value={search}
                                    onChange={(event) => {
                                    setSearch(event.target.value)} }
                                />
                                <div className="input-group-append ">
                                    <button type='submit' className='bg-primary border-0 px-3' onClick={nav} > <i className="pi pi-search text-white bg-blue"/> </button>
                                </div>
                            </div>
                        </Form>    
                    )}
                    
                     
                    {user ? 
                    <Nav>
                        {user.role ===1 ?
                         <Nav.Link className=" item mt-2  " eventkey={1.5} href="https://projet-apis-admin.herokuapp.com/"> Page Admin </Nav.Link>:
                         <h5></h5>
                         }
                       
                    <div className="profile nav-bar flex items-center gap-2 cursor-pointer pt-0 mr-3" onClick={() => handleClick('userProfile')}>
                            {user.image ?
                            <img className="rounded-full w-10 h-10" src={`${url}/${user.image}`} alt="" />
                            :
                            <img className="rounded-full w-10 h-10" src={userImage} alt="" />
                            }
                              
                            <p className=" md:block pt-3">
                                <span className="text-gray-400 text-14"> ,</span> 
                                <span className="text-gray-400 text-14 font-bold">{`${user.firstname} ${user.lastname}`} </span>
                            </p>
                        </div> 
                         {isClicked.userProfile && ( <UserProfile /> )} 
                    </Nav> 
                    :    
                    <Nav className=" regis  mt-2">
                        <Nav.Link className=" item  " eventkey={1.5} href="/Login"> Connexion </Nav.Link>
                        <Nav.Link  className="item " eventKey={1.6} href="/Register" >
                        Inscription
                        </Nav.Link>
                    </Nav>
                }
                    
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>

        </Navbar>
      
    </div>
  )
}

export default NavBarBoost
