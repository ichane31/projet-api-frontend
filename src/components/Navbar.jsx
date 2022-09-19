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
import  {Link} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';

const NavBarBoost = () => {


  return (
    <div className="navNotUser" >
        <Navbar fixed='top' offcanvasnavbar='true' expand="lg" bg="white" variant="light" className=" mb-5 d-flex justify-content-between align-items-center border-b-1 shadow-md"  >
            <Container fluid className="d-flex containerNav">
                <Navbar.Brand className="" href="#"><img src={lablib2} alt="logo" width={75} height={50}/></Navbar.Brand>
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
                    <Nav className="navNotAcc me-auto mt-1" >
                        <Nav.Link eventkey={1.1} className=" item d-flex  hover:text-blue-800" href="/">  Acceuil</Nav.Link>
                        
                        <Nav.Link eventkey={1.4} className=" item  " href="/Contact"> Contact</Nav.Link>
                    </Nav>
                      
                    <Nav className=" navRegis  mt-1">
                        <Nav.Link className=" item  " eventkey={1.5} href="/Login"> Connexion </Nav.Link>
                        <Nav.Link  className="item " eventKey={1.6} href="/Register" >
                        Inscription
                        </Nav.Link>
                    </Nav>
                
                    
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>

        </Navbar>
      
    </div>
  )
}

export default NavBarBoost
