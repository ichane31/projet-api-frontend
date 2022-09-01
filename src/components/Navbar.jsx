import React , {useState , useEffect} from 'react'
import logo from '../data/logo.png';
import '../css/App.css'
import {GetCategory} from '../services/CategoryService';
import user from '../data/user.jpg';
import UserProfile from './UserProfile';
import { useStateContext } from '../contexts/ContextProvider';

const Navbar = () => {
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
    <>
    <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle"></span>
            </div>
        </div>
        <div className="site-mobile-menu-body"></div>
    </div>
    <div id="sticky-wrapper" className="sticky-wrapper is-sticky" style={{height: '100.667px'}}>

     <header className ="site-navbar js-sticky-header site-navbar-target container_top_progress_bar" role="banner" style={{ position: 'fixed', top: 0, zIndex: 'inherit', width: '100%'}}>
        <div className='container-fluid'>
                <div className='row'>
                <div className="col-12">
                    <nav className="site-navigation d-flex justify-content-between align-items-center" role="navigation" >
                        <div>
                            <a href="">
                                <img src={logo} alt="logo" width={48} height={45}/>
                            </a>
                        </div>
                        <ul className="site-menu js-clone-nav m-0 d-none d-lg-block">
                            <li> <a href="/Acceuil" className='nav-link'> <i className='icon-home'/> Acceuil</a> </li>
                            <li className='has-children'>
                                <a href="/Categories" className='nav-link'> Category</a>
                                <ul className="dropdown arrow-top">
                                   
                                     {categories.map(
                                        e => <li key={e.id}><a href="/Projet">{e.name}</a></li>
                                    )} 
                                </ul>
                            </li>
                            <li><a href="/Contact" className='nav-link'> Contact</a></li>

                        </ul>
                        <form className="js-clone-formSerach navbar-form form-inline ml-auto searchbar" action="" method="get">
                            <div className="input-group search-box">
                                <input type="text" className=' inputSearch form-control text-black '  aria-label='Search' placeholder='Chercher ici .....'/>
                                <div className="input-group-append">
                                    <button type='submit' className='bg-primary border-0 px-3'> <i className="pi pi-search text-white bg-blue"/> </button>
                                </div>
                            </div>

                        </form> 
                        <div className="nav-bar ml-auto">
                            <ul className="site-menu js-clone-nav m-0 d-none d-lg-block">
                                <li><a href="/Login" className="nav-link">Login</a></li>
                                <li><a href="/Register" className="nav-link"><span className="signup-btn">Sign Up</span></a></li>
                         </ul>
                        </div>   
                        {/* <div className="profile nav-bar flex items-center gap-2 cursor-pointer pt-0 ml-auto mr-5" onClick={() => handleClick()}>
                            <img className="rounded w-10 h-10" src={user} alt="user-image" />
                             <div className="rounded-full w-10 h-10 bg-orange-600 text-center">R</div> 
                            <p className=" md:block pt-3">
                                <span className="text-gray-400 text-14"> Bonjour,</span>
                                <span className="text-gray-400 text-14 font-bold">Ichane </span>
                            </p>
                        </div> */}
                        {isClicked && ( <UserProfile setIsClicked={setIsClicked}/> )}
                    </nav>
                </div>
            </div>
            <div className="toggle-button d-inline-block d-lg-none">
              <a href="#" className="site-menu-toggle py-5 js-menu-toggle text-black">
               <span className="icon-menu h3 " />
             </a>
        
            </div>
        </div>
       <div className="top_progress_container" >
          <div className="top_progress_bar" id="myBar" />
       </div>
    </header> 
</div>
</>
  )
}

export default Navbar
