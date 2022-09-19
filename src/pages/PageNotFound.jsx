import React from 'react';
import Helmet from 'react-helmet';
import notFound from '../data/notFound.jpg';

const PageNotFound = () => {
  return (
    <div>
        <Helmet>
            <script>
                document.title = "Not Found !!!!"
            </script>
        </Helmet>

        <div className='flex justify-center align-center p-5 ' style={{height:'30%' ,marginLeft:'15%' ,marginRight:'15%'}}>
            <img src={notFound} alt="Cette page n' exist pas" className='' style={{height:'auto'}} />
        </div>
        <div className='flex justify-center align-center'>
            <a className='btn' href="/Acceuil" type='button' style={{fontSize:'22px'}}>Retour vers la page d'Acceuil</a>
        </div>
      
    </div>
  )
}

export default PageNotFound
