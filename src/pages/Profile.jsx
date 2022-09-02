import React , { useState, useEffect, useRef } from 'react';
import {InputText} from 'primereact/inputtext';
import {FileUpload} from 'primereact/fileupload';
import Helmet from "react-helmet";
import { Formik} from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import {GetMe } from '../services/UserService';
import user from '../data/user.jpg';
import '../css/Form.css';
import { GetMeDetails } from '../services/UserService';
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
                <div className="text-center mb-12">
                    <h5 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Modifier le <span className="text-indigo-600">Profile</span>
                    </h5>
                </div>
                <div className="  border-b-1 mb-3 justify-content-center items-center">
                     <div className='flex justify-content-center gap-5 items-center mt-2 border-color  pb-6'>
                         <img className="  rounded-full h-33 w-33" src={user} alt="user-profile" />
                     </div>
                     
                </div>
                <Formik
                    initialValues = {{firstname:'',lastname:'',email:'',password:'',currentPassword:'',image:''}}
                    validateSchema={Yup.object({
                        firstname: Yup.string()
                        .min(3, "trop petit")
                        .max(50 , "trop long!")
                        .required("Prenom obligatoire"),
                        lastname: Yup.string()
                        .min(3, "trop petit")
                        .max(50 , "trop long!")
                        .required("Nom obligatoire"),
                        email: Yup.string()
                        .email("Email invalide")
                        .required("Email obligatoire"),
                        password: Yup.string()
                        .min(8, "Mot de passe doit depaser 8 caractères")
                        .max(25 , "Mot de passe trop long!")
                        .required("Mot de passe obligatoire"),
                        currentPassword: Yup.string()
                        .min(8 , 'Mot de passe trop petit')
                        .matches(/^[\w]+$/ , 'erreur')
                        .when('password', (password, field) =>
                        password? field.required(): field),
                        image: Yup.mixed().required('choisir une image').nullable()
                    })}
                    
                    onSubmit={async (values, { setSubmitting }) => {
                        let data = new FormData();
                        for (let value in values) {
                            data.append(value , values[value]);
                        }
                        setSubmitting(true);
                        console.log(values)
                        var requestOptions = {
                            method: 'POST',
                            body: data,
                            redirect: 'follow'                        }
                    } }>

                    {(formik) => (
                        <form className="w-full" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                            <div className="flex flex-wrap -mx-3 mb-6 p-2">
                                <div className="w-full px-0 mb-0 md:mb-0">
                                    <label className='' htmlFor="image">Image*</label>{' '}
                                    <FileUpload
                                        // type="file"
                                        mode="basic"
                                        name="demo[]"
                                        url="https://api.affinda.com/v2"
                                        accept=".png, .jpg, .jpeg "
                                        onUpload = {(event) => {
                                            formik.setFieldValue("image", event.getFile())
                                        }}
                                        // onChange={(event) => {
                                        //     // const fileReader = new FileReader();
                                        //     // fileReader.onload = () => {
                                        //     //     if (fileReader.readyState === 2) {
                                        //     //         formik.setFieldValue('image', fileReader.result);
                                        //     //     // setAvatarPreview(fileReader.result);
                                        //     //     }
                                        //     // };
                                        //     // fileReader.readAsDataURL(event.currentTarget.files[0]);
                                        //     formik.setFieldValue("image", event.target.files[0])
                                        // }}
                                        
                                        />
                                    {formik.touched.image && formik.errors.image ? (
                                        <div className="text-red-500 text-xs italic">{formik.errors.image}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="FirstLast p-2 w-auto">
                                <div className='flex flex-wrap -mx-3 mb-6 '>
                                    <div className="w-full px-0 mb-0 md:mb-0 ">
                                        <label className='' htmlFor="firstname">Prenom*</label> {' '}
                                        <InputText
                                            className="champ  bg-white py-2 text-gray-600 border leading-tight focus:outline-none focus:bg-white " 
                                            id="firstname" 
                                            type="text"
                                            placeholder="prenom" 
                                            {...formik.getFieldProps('firstname')}
                                        />
                                        {formik.touched.firstname && formik.errors.firstname ? (
                                            <div className="text-red-500 text-xs italic">{formik.errors.firstname}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6 ">
                                    <div className="w-full px-0 mb-0 md:mb-0">
                                        <label className='' htmlFor="lastname">Nom*</label> {''}
                                        <InputText
                                            className="champ bg-white py-2 text-gray-600 border leading-tight focus:outline-none focus:bg-white" 
                                            id="lastname" 
                                            type="text"
                                            placeholder="nom" 
                                            {...formik.getFieldProps('lastname')}
                                        />
                                        {formik.touched.lastname && formik.errors.lastname ? (
                                            <div className="text-red-500 text-xs italic">{formik.errors.lastname}</div>
                                        ) : null}
                                    </div>
                                </div>
                            
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6 p-2">
                                <div className="w-full px-0 mb-0 md:mb-0">
                                    <label className='' htmlFor="title">Email*</label>{''}
                                    <InputText
                                        className="w-full bg-white py-2 text-gray-600 border leading-tight focus:outline-none focus:bg-white" 
                                        id="email" 
                                        type="email"
                                        placeholder="adresse email" 
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="FirstLast p-2 w-auto">
                                <div className='flex flex-wrap -mx-3 mb-6 '>
                                    <div className="w-full px-0 mb-0 md:mb-0 ">
                                        <label className='' htmlFor="password">Ancien mot de passe*</label> {' '}
                                        <InputText
                                            className="champ  bg-white py-2 text-gray-600 border leading-tight focus:outline-none focus:bg-white " 
                                            id="password" 
                                            type="password"
                                            placeholder="mot de passe" 
                                            {...formik.getFieldProps('password')}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 text-xs italic">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6 ">
                                    <div className="w-full px-0 mb-0 md:mb-0">
                                        <label className='' htmlFor="newpassword">Nouveau mot de passe*</label> {''}
                                        <InputText
                                            className="champ bg-white py-2 text-gray-600 border leading-tight focus:outline-none focus:bg-white" 
                                            id="newpassword" 
                                            type="password"
                                            placeholder="nouveau mot de passe" 
                                            {...formik.getFieldProps('currentPassword')}
                                        />
                                        {formik.touched.currentPassword && formik.errors.currentPassword ? (
                                            <div className="text-red-500 text-xs italic">{formik.errors.currentPassword}</div>
                                        ) : null}
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-between w-full px-3">
                                    <button className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" 
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? "Creating..." : "Modifier votre profile"}
                                    </button>
                                </div>
                            
                        </form>
                    ) }
                    
                </Formik>
             </div>
        </div>
    </>
  )
}

export default Profile
