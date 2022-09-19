import React  , {useState} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineSetting} from 'react-icons/ai';
import { Logout , GetMe } from '../services/UserService';
import { Link  , useNavigate} from 'react-router-dom';
import userImage from '../data/user.jpg';
import {CgProfile} from 'react-icons/cg'; 
import {useAuth} from '../hoc/useAuth';
import {useStateContext} from '../contexts/ContextProvider';
import { removeItemFromStorage  , getItemFromStorage} from '../helpers/helper';

const UserProfile = () => {
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';

    const [currentUser , setCurrentUser] = useState(null);
    const { user, dispatch } = useAuth();
    const {setIsClicked} = useStateContext();
    let navigate = useNavigate();
    const token = getItemFromStorage('token');


    
    const logout = async () => {
        try {
         let res = await Logout(token);
         if(res.ok) {
            dispatch({ type: 'LOGOUT-USER' , user:''});
            window.localStorage.clear();
            setIsClicked(false);
            navigate('/');
         }
            
        } catch (error) {
            
        }
        navigate('/');
    }
  return (
    <div className="nav-item absolute right-2 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-auto shadow-2xl">
        <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200 ">Votre Profile</p>
            <button className="hover:bg-yellow-600 rounded-full w-7 h-7" 
           > <i className="w-7" onClick={() => setIsClicked(false)} >{<MdOutlineCancel className='w-7 h-7' />}</i> </button>
        </div>
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          {user?.userImage ?
            <img className="rounded-full h-20 w-20" src={`${url}/${user.image}`} alt="user-profile" />:
            <img className="rounded-full h-20 w-20" src={userImage} alt="user-profile" />
            }
            <div>
                <p className="font-semibold text-xl dark:text-gray-200"> {user?.firstname} </p>
                <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user?.email}</p>
            </div>
        </div>
        <div>
            <div className="flex gap-5 border-b-1 border-color p-2 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button className="text-xl rounded-lg p-0 hover:bg-light-gray  "> <i>{<CgProfile className='w-7 h-7' />}</i> </button>
                <Link to="Profile" className="text-dark" >
                    <div  >
                        <p className="font-semibold dark:text-gray-200 text-16 fs-5 ">Mon profile</p>
                        <p className="text-gray-500 text-16 dark:text-gray-400 fs-6"> Voir le profile </p>
                    </div>
                </Link>
            </div>
        </div>
        <div>
            <div className="flex gap-5 border-b-1 border-color p-2 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button className="text-xl rounded-lg p-0 hover:bg-light-gray  "> <i>{<AiOutlineSetting className='w-7 h-7' />}</i> </button>
                <Link to="ProfileSetting" className="text-dark">
                    <div >
                        <p className="font-semibold dark:text-gray-200 text-16 fs-5 ">Parametres du compte</p>
                       
                    </div>
                </Link>
            </div>
        </div>
        <div>
            <div className="flex gap-5 border-b-1 border-color p-2 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                {/* <button className="text-xl rounded-lg p-0 hover:bg-light-gray  "> <i>{<AiOutlineSetting className='w-7 h-7' />}</i> </button> */}
                <Link to="MesFavoris" className="text-dark">
                    <div >
                        <p className="font-semibold dark:text-gray-200 text-16 fs-5  ">Mes Projets Favoris</p>
                       
                    </div>
                </Link>
            </div>
        </div>
        {/* <div>
            <div className="flex gap-5 border-b-1 border-color p-2 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
 
                <Link to="MesProjets" >
                    <div >
                        <p className="font-semibold dark:text-gray-200 text-16 fs-5  ">Mes Projets Publiés</p>
                       
                    </div>
                </Link>
            </div>
        </div> */}
        <div className="mt-5">
            <button className="text-white bg-red-600 w-full h-10 rounded hover:bg-red-400"
            onClick={() => logout()}>Deconnexion</button>
        </div>
    </div>
  )
}

export default UserProfile
