import React from 'react';
import '../css/App.css';
import first0 from '../data/First0.jpg'

const FirstPage = () => {
  return (
    <div className="c-home">
        <div className="container">
            <div className="first">
                <div className="new-lohp-container float-right">
                                        
                    <img className='landing-heor-image hidden-xs' src={first0} alt="first0" />  
                </div>
                <div className="float-letf">
                    <div className="float-left mt-5">
                        <div>
                            <h2 className='mb-5'>Nous vous souhaitons la bienvenue</h2>
                            <p>Inscrivez-vous sur notre site et publier tous vos projets.</p>
                            <p>Consulter des milliers de projets qui pourrons vous inspirer.</p>
                            <p>Laisser un avis , un commentaire. </p>
                            <p>Attribuer des notes aux projets de votre choix.</p>
                        </div>
                    </div>
                                    
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default FirstPage
