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
import user from '../data/user.jpg';
import UserProfile from './UserProfile';
import React , {useEffect, useState} from 'react';
import  {Link} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {useStateContext} from '../contexts/ContextProvider';


const url = 'https://projet-apis.herokuapp.com/api/v1/file';
const NavBarBoost = () => {
    const {handleClick , isClicked } = useStateContext();
    const [categories, setCategories] = useState([]);
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
            <Container fluid className="d-flex">
                <Navbar.Brand className="ml-3" href="#"><img src={lablib2} alt="logo" width={75} height={50}/></Navbar.Brand>
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
                    <Nav className=" me-auto" >
                        <Nav.Link eventkey={1.1} className=" item ml-3 fs-5 d-flex  hover:text-blue-800" href="/Acceuil"><i className='pi pi-home mt-3'/>{''} <h5 className="linkText mt-3">  Acceuil</h5></Nav.Link>
                        <NavDropdown className="ml-3 fs-5 text-dark" eventkey={1.2}  title={ <span className="mt-3 linkText">Categories</span>}  id="offcanvasnavbarDropdown-expand-lg" 
                        // onToggle={() => { window.location.href = '/Categories'}}
                        // onMouseEnter={() => setIsToolsHovered(true)}
                        // onMouseLeave={() => setIsToolsHovered(false) } 
                        >
                           <NavDropdown.Item eventKey={1.3} href={`/Categories`}>Toutes les categories</NavDropdown.Item>
                              {categories.map(
                                        e => <NavDropdown.Item eventKey={e.id} href={`/Categories/${e.id}/ProjetByCategory`}>{e.name}</NavDropdown.Item>
                                    )}
                           
                        </NavDropdown>
                        <Nav.Link eventkey={1.4} className=" item ml-4 fs-5 " href="/Contact"> <h5 className="linkText mt-3">Contact</h5></Nav.Link>
                    </Nav>
                    <Form className=" row mt-3 pr-40 searchbar">
                        
                        <div className="input-group search-box ">
                            <input type="seach" className='  form-control text-black focus:bg-gray-700'  aria-label='Search' placeholder='Chercher ici .....'
                            style={{}} />
                            <div className="input-group-append ">
                                <button type='submit' className='bg-primary border-0 px-3'> <i className="pi pi-search text-white bg-blue"/> </button>
                            </div>
                        </div>
                  
                    </Form>
                     <Nav className="  mr-3">
                        <Nav.Link className=" item ml-3 " eventkey={1.5} href="/Login"> <h5 className="linkText mt-3">Connexion</h5> </Nav.Link>
                        <Nav.Link  className="item ml-3 fs-5" eventKey={1.6} href="/Register" >
                        <h5 className="linkText mt-3">Inscription</h5>
                        </Nav.Link>
                    </Nav>
                    {/* <Nav>
                    <div className="profile nav-bar flex items-center gap-2 cursor-pointer pt-0 ml-auto mr-5" onClick={() => handleClick('userProfile)}>
                            <img className="rounded-full w-10 h-10" src={user} alt="user-image" />
                              
                            <p className=" md:block pt-3">
                                <span className="text-gray-400 text-14"> Bonjour,</span>
                                <span className="text-gray-400 text-14 font-bold">Ichane </span>
                            </p>
                        </div> 
                        {isClicked && ( <UserProfile setIsClicked={setIsClicked}/> )}
                    </Nav> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>

        </Navbar>
      
    </div>
  )
}

export default NavBarBoost
