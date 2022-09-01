import React  , {useState} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Logout , GetMe } from '../services/UserService';
import { Link  , useNavigate} from 'react-router-dom';
import user from '../data/user.jpg';
import {CgProfile} from 'react-icons/cg'; 

const UserProfile = ({setIsClicked}) => {

    const [currentUser , setCurrentUser] = useState(null);
    let navigate = useNavigate();


    const getCurrentUser = () => {
       const  headers ={
            headers: {'authorization': 'Bearer ' + localStorage.getItem('token')}
        }

        GetMe(headers).then((res) => setCurrentUser(res));
    }
    const logout = () => {
        // try {
        //  let res = Logout();
        //  if(res.ok) {
        //  navigate('/Login');
        //  }
            
        // } catch (error) {
            
        // }
        navigate('/Login');
    }
  return (
    <div className="nav-item absolute right-2 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-auto shadow-2xl">
        <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200 ">Votre Profile</p>
            <button className="hover:bg-yellow-600 rounded-full w-7 h-7" 
            onClick ={() => {setIsClicked(false)}}> <i className="w-7" >{<MdOutlineCancel className='w-7 h-7' />}</i> </button>
        </div>
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            <img className="rounded-full h-24 w-24" src={user} alt="user-profile" />
            <div>
                <p className="font-semibold text-xl dark:text-gray-200"> Ichane </p>
                <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> ichaneRoukeya@gmail.com </p>
            </div>
        </div>
        <div>
            <div className="flex gap-5 border-b-1 border-color p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button className="text-xl rounded-lg p-0 hover:bg-light-gray  "> <i>{<CgProfile className='w-7 h-7' />}</i> </button>
                <Link to="Profile" onclick={() => setIsClicked(false)}>
                    <div onClick={() => setIsClicked(false)}>
                        <p className="font-semibold dark:text-gray-200 text-16 fs-5 ">Mon profile</p>
                        <p className="text-gray-500 text-16 dark:text-gray-400 fs-6"> Voir le profile </p>
                    </div>
                </Link>
            </div>
        </div>
        <div className="mt-5">
            <button className="text-white bg-red-600 w-full h-10 rounded hover:bg-red-400"
            onClick={() => logout()}>Deconnexion</button>
        </div>
    </div>
  )
}

export default UserProfile
