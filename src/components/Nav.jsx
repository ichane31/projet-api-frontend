import React from 'react'
import '../css/App.css';
import Category from '../data/category.jpg';

const Nav = () => {
  return (
    <nav aria-label="breadcrumb bg-gray-700">
        <ol className="breadcrumb bg-gray-500">
           <li className="breadcrumb-item"><i className="icon-home mr-2" /><a href="/">Accueil</a></li>
            <li className="breadcrumb-item active" aria-current="page"> <i className="icon-folder mr-2" />Category</li> 
        </ol>
    </nav>

  )
}

export default Nav
