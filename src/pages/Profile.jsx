import React , { useState, useEffect, useRef,useMemo } from 'react';
import {InputText} from 'primereact/inputtext';
import {FileUpload} from 'primereact/fileupload';
import Helmet from "react-helmet";
import { Formik , Field} from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import userImage from '../data/user.jpg';
import '../css/Form.css';
import {useAuth} from '../hoc/useAuth';
import countryList from 'react-select-country-list'
import { Dropdown } from 'primereact/dropdown';
import Select from 'react-select';
import {PutMe} from '../services/UserService';
import {getItemFromStorage} from '../helpers/helper';


const Profile = () => {
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';

    const toast = useRef(null);
    const [file , setFile] = useState(null);
    const [fileDataUrl , setFileDataUrl] = useState(null);
    const {user} = useAuth();
    const token = getItemFromStorage('token');
    const UserEmail = user?.email;
    

    const inputRef = useRef();
    const resetFileInput = ( ) => {
        inputRef.current.value = null;
    }
    const options = useMemo(() => countryList().getData(), [])
    

    useEffect(() => {
        let fileReader , isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataUrl(result)
                }
            }
             fileReader.readAsDataURL(file);
        }  
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }  
    }, [file]);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const uploadFile = () => {
        document.getElementById('selectFile').click();
    }
  return (
    <>
        <Helmet>
            <script>
                document.title = "Profile utilisateur"
            </script>
        </Helmet>
        <Toast ref={toast} />
        <div className="w-full prof ">
            <div className=" profileUser bg-gray-100  ">
                <div className="text-center mb-3">
                    <h4 className="  leading-normal font-extrabold tracking-tight text-gray-900">
                        Modifier le <span className="text-indigo-600">Profile</span>
                    </h4>
                </div>
                
                <Formik
                    initialValues = {{firstname:user?.firstname,lastname:user?.lastname , email: user?.email,country:user?.country,image:user?.image}}
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
                        
                        image: Yup.mixed().required('choisir une image').nullable()
                    })}
                    
                    onSubmit={async (values, { setSubmitting , resetForm }) => {
                        let data = new FormData();
                        for (let value in values) {
                            data.append(value , values[value]);
                        }
                        setSubmitting(true);
                        console.log(values)
                        var requestOptions = {
                            method: 'PUT',
                            body: data,
                            headers: {"Authorization": "Bearer " +token},
                            redirect: 'follow'                        
                        }

                        try {
                            let res = await PutMe(requestOptions);
                            if (res.ok) {
                                let d = await res.json();
                               if(values.email !== UserEmail) {
                                toast.current.show({ severity: 'success', summary: 'modifié avec succès!', detail: "Un email vous a éte envoyé cliqué sur le lien pour changer votre email", life: 3000 });
                                window.localStorage.clear();
                               }
                               else {toast.current.show({ severity: 'success', summary: 'modifié avec succès!', detail: "Mis à jour avec success", life: 3000 }); }
                                resetForm();
                                resetFileInput();
                                
                            }
                            else {
                                if(Array.isArray(res) && res.length === 0) return "error";
                                let r = await res.json()
                                throw r[0]?.message;
                            }
                            
                        } catch (err) {
                            console.log("err: ", err);
                            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
                            
                        }
                    } }>

                    {(formik) => (
                        <form className="w-full" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                            <div className="flex flex-wrap  mb-6 p-2">
                                <div className="w-full px-0 mb-0 md:mb-0">
                                    <div className="  border-b-1 mb-3 justify-content-center items-center">
                                        <div className='flex justify-content-center gap-5 items-center border-color  pb-6'>
                                            {fileDataUrl ? 
                                                <img className="rounded-full " src={fileDataUrl} alt="user-profile" />:
                                                
                                                <img className="rounded-full " src={user?.image ? `${url}/${user.image}` : userImage} alt="user-profile" />
                                            }
                                            
                                            <button className='btn border-dark ch_btn' onClick={uploadFile} > <i className="pi pi-camera text-primary"> </i> Upload....</button>
                                        </div>
                        
                                    </div>
                                    
                                    <input
                                        ref={inputRef}
                                        id='selectFile'
                                        type="file"
                                        style={{display: 'none'}}
                                        url="https://api.affinda.com/v2"
                                        accept=".png, .jpg, .jpeg "
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            if (!file.type.match(imageMimeType)) {
                                                toast.current.show({ severity: 'danger', summary: 'Faild', detail: 'Image mime type is not valid', life: 3000 });
                                                return;
                                            }
                                            setFile(file);
                                            formik.setFieldValue("image", event.currentTarget.files[0])
                                        }}
                                        
                                        />
                                    {formik.touched.image && formik.errors.image ? (
                                        <div className="text-red-500 text-xs italic">{formik.errors.image}</div>
                                    ) : null}
                                </div>
                            </div>
                            
                                <div className='flex flex-wrap -mx-3 mb-6 '>
                                    <div className="w-full px-0 mb-0 md:mb-0 ">
                                        <label className='' htmlFor="firstname">Prenom*</label> {' '}
                                        <InputText
                                            className=" py-2 champ  " 
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
                                            className=" py-2 champ" 
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
                                <div className='flex flex-wrap -mx-3 mb-6 '>
                                    <div className="w-full px-0 mb-0 md:mb-0 ">
                                        <label className='' htmlFor="firstname">Email*</label> {' '}
                                        <InputText
                                            className=" py-2 champ  " 
                                            id="email" 
                                            type="email"
                                            placeholder="email" 
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>
                                {/* <div className='flex flex-wrap -mx-3 mb-6 '>
                                    <div className="w-full px-0 mb-0 md:mb-0 ">
                                        <label className='' htmlFor="firstname">Selectionner un pays</label> {' '}
                                        <Select 
                                           className="  champ  " 
                                           id="country" name="country" 
                                           placeholder="Selectionner un pays"
                                           value={formik.values.country ? formik.values.country: "Selectionner un pays"} 
                                           onChange={(e) => {formik.setFieldValue("country", e.target.value)}} options={options} 
                                           />
                                        
                                    </div>
                                </div> */}
                            
                            
                            
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
