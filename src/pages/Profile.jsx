import React , { useState, useEffect, useRef } from 'react';
import {InputText} from 'primereact/inputtext';
import Helmet from "react-helmet";
import { Formik} from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import {GetMe } from '../services/UserService';
import user from '../data/user.jpg';
import '../css/Form.css';

const Profile = () => {

    const [currentUser , setCurrentUser] = useState(null);

    const toast = useRef(null);

    const inputRef = useRef();
    const resetFileInput = ( ) => {
        inputRef.current.value = null;
    }

    useEffect(() => {})
  return (
    <>
        <Helmet>
            <script>
                document.title = "Profile utilisateur"
            </script>
        </Helmet>
        <Toast ref={toast} />
        <div className=" m-5 bg-gray-200 dark:bg-[#42464D] p-5 rounded-lg w-auto shadow-2xl">
             <div className=" profileUser bg-white w-auto p-5">
                <div className="text-center mb-16">
                    <h5 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Modifier le <span className="text-indigo-600">Profile</span>
                    </h5>
                </div>
                <div className="  border-b-1 mb-3 justify-content-center items-center">
                     <div className='flex justify-content-center gap-5 items-center mt-6 border-color  pb-6'>
                         <img className="  rounded-full h-34 w-34" src={user} alt="user-profile" />
                         
                     </div>
                     <div className='mb-4  items-center justify-content-center'> salut</div>
                </div>
             </div>
        </div>
    </>
  )
}

export default Profile
