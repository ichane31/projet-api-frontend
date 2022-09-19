import React from 'react'
import '../css/footer.css'

const Footer = () => {
  return (
    <footer className="p-3 shadow-sm">
  <div className="container">
    <div className="row p-3">
      <div className="col-sm-4">
        <ul>
          <li className="p-2">About</li>
          <hr />
   
          <li className="p-2"><a href="/Contact">Contact</a></li>
        </ul>
      </div>
      <div className="col-sm-4">
        <ul>
          <li className="p-2">LabLib Projets</li>
          <hr />
          <li className="p-2"><a href="#">Politique de confidentialité</a></li>
          <li className="p-2"><a href="#">Faq</a></li>
          {/* <li className="p-2"><a href="#">Plan du site</a></li> */}
        </ul>
      </div>
      <div className="col-sm-4">
        <ul>
          <li className="p-2">Réseaux sociaux</li>
          <hr />
          <li className="p-2"><i className="icon-facebook-square mr-2" /><a href="#"> Facebook</a></li>
          <li className="p-2"><i className="icon-linkedin-square mr-2" /><a href="#"> LinkedIn</a></li>
          <li className="p-2"><i className="icon-twitter-square mr-2" /><a href="#"> Twitter</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-3">
      <h6 className="text-center">Copyright © 2022 - <a href="https://projet-api-frontend.herokuapp.com/" className="text-warning">LabLib Projets</a> - Tous droits réservés</h6>
      <p className="text-center">v.0.2, updated 06-21-22 by ichane</p>
    </div>
  </div>
</footer>

  )
}

export default Footer
