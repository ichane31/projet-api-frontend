import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../data/logo.png';
import '../css/App.css'
import {GetCategory} from '../services/CategoryService';
import user from '../data/user.jpg';
import UserProfile from './UserProfile';
import React , {useEffect, useState} from 'react'

const NavBarBoost = () => {
    const [isClicked , setIsClicked] = useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        GetCategory().then(data => {
            setCategories(data);
        });
        
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = () => {
        setIsClicked(true);
        console.log(isClicked)
    }

  return (
    <div >
        <Navbar offcanvasNavbar expand="lg" bg="dark" variant="dark" className="mb-3 d-flex justify-content-between align-items-center" style={{}}>
            <Container fluid className="d-flex">
                <Navbar.Brand className="ml-3" href="#"><img src={logo} alt="logo" width={75} height={50}/></Navbar.Brand>
                <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
                <Navbar.Offcanvas
                    id='offcanvasNavbar-expand-lg'
                    // aria-labelledby='offcanvasNavbarLabel-expand-$lg'
                     placement="end"
                     className="  row"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>
                           Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav className=" me-auto">
                        <Nav.Link className="ml-3 fs-5" href="/Acceuil"><i className='pi pi-home'/> Acceuil</Nav.Link>
                        <NavDropdown className="ml-3 fs-5" title="Categories" id="collasible-nav-dropdown">
                              {categories.map(
                                        e => <NavDropdown.Item key={e.id} href={`${e.id}/ProjetByCategory`}>{e.name}</NavDropdown.Item>
                                    )}
                           
                        </NavDropdown>
                        <Nav.Link className="ml-3 fs-5" href="/Contact"> Contact</Nav.Link>
                    </Nav>
                    <Form className="d-flex form-inline pr-40">
                        
                        <div className="input-group search-box">
                            <input type="text" className=' inputSearch form-control text-black '  aria-label='Search' placeholder='Chercher ici .....'/>
                            <div className="input-group-append">
                                <button type='submit' className='bg-primary border-0 px-3'> <i className="pi pi-search text-white bg-blue"/> </button>
                            </div>
                        </div>
                  
                    </Form>
                    {/* <Nav className="mr-3">
                        <Nav.Link className="ml-3 fs-5" href="/Login">Connexion</Nav.Link>
                        <Nav.Link  className="ml-3 fs-5" eventKey={2} href="/Register" >
                        Inscription
                        </Nav.Link>
                    </Nav> */}
                    <Nav>
                    <div className="profile nav-bar flex items-center gap-2 cursor-pointer pt-0 ml-auto mr-5" onClick={() => handleClick()}>
                            <img className="rounded-full w-10 h-10" src={user} alt="user-image" />
                              
                            <p className=" md:block pt-3">
                                <span className="text-gray-400 text-14"> Bonjour,</span>
                                <span className="text-gray-400 text-14 font-bold">Ichane </span>
                            </p>
                        </div> 
                        {isClicked && ( <UserProfile setIsClicked={setIsClicked}/> )}
                    </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>

        </Navbar>
      
    </div>
  )
}

export default NavBarBoost
