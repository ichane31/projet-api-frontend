import React, {useRef} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import Helmet from "react-helmet"
import { Formik} from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import '../../css/auth.css';
import {PostRegisterUser} from '../../services/UserService';


export default function Register() {
    const toast = useRef(null);
    let navigate = useNavigate();

    const inputRef = useRef(null);

    const resetFileInput = () => {
        inputRef.current.value = null;
    };
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cf_password: "",
        acceptTerms: false,
    };
    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
        .min(3, "trop petit")
        .max(50, "trop long!")
        .required("Ce champ est obligatoire"),
    lastname: Yup.string()
        .min(3, "trop petit")
        .max(10, "trop long!")
        .required("Ce champ est obligatoire"),
        email: Yup.string()
        .email("email invalide")
        .required("l'email est obligatoire"),
    password: Yup.string()
        .required("Mot de passe est obligatoire")
        .min(8, "Mot de passe doit être plus grand que 8 caractères")
        .max(50, "Mot de passe doit être plus petit que 50 caractères"),
    cf_password: Yup.string()
        .required("Confirmation de mot de passe est obligatoire")
        .oneOf(
            [Yup.ref("password"), null],
            "Le mot de passe de confirmation ne correspond pas"
        ),
    acceptTerms: Yup.bool().oneOf([true], "Accepter les conditions est obligatoire"),
    })
  return (
    <>
       <Helmet>
                <script>
                    document.title = "Inscription"
                </script>
        </Helmet>
        <Toast ref={toast} />
        <div className="login_page ">
            <h2>Inscription</h2>
            <Formik 
            initialValues = {initialValues}
            validationSchema = {validationSchema} 
            onSubmit= {async (values , {setSubmitting , resetForm}) =>  {
                let data = new FormData();
                for (let value in values) {
                    data.append(value, values[value]);
                }
                setSubmitting(true);
                var requestOptions = {
                    method: 'POST',
                    body: data,
                    redirect: 'follow'
                };

                try{
                    let res = await PostRegisterUser(requestOptions)
                    if (res.ok){
                        let d = await res.json();
                        toast.current.show({ severity: 'success', summary: 'Created!', detail: "Un email de verification vous a eté envoyé", life: 3000 });
                        resetForm();
                        // resetFileInput();
                        console.log(d)
                        navigate(`/${values.email}/emailSend`)
                    }
                    else{
                        if(Array.isArray(res) && res.length === 0) return "error";
                        let r = await res.json()
                        throw r[0].message;
                    }
                }
                catch (err){
                    console.log("err: ", err);
                    toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
                } 
                
            }}
            >

               {(formik) => (
                <> 
                <form className="p-fluid " onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className=" nomPrenom  justify-center-between">
                    <div className="wrap">
                        <label className='' htmlFor="firstname">Prenom</label>
                        <input
                            className=" " 
                            id="firstname" 
                            type="text"
                            placeholder="Entrez votre prenom" 
                            {...formik.getFieldProps('firstname')}
                        />
                        {formik.touched.firstname && formik.errors.firstname ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.firstname}</div>
                        ) : null}
                    </div>
                    <div className="wrap">
                        <label className='' htmlFor="lastname">Nom</label>
                        <input
                            className=" " 
                            id="lastname" 
                            type="text"
                            placeholder="Entrez votre nom" 
                            {...formik.getFieldProps('lastname')}
                        />
                        {formik.touched.lastname && formik.errors.lastname ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.lastname}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="wrap">
                        <label className='' htmlFor="lastname">Addresse Email</label>
                        <input
                            className=" " 
                            id="email" 
                            type="email"
                            placeholder="Entrez votre email" 
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    
                    <div className="wrap">
                    <label className='' htmlFor="lastname">Mot de passe</label>
                        <input
                            className=" " 
                            id="password" 
                            type="password"
                            placeholder="Entrez votre mot de passe" 
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="wrap">
                    <label className='' htmlFor="lastname">Confirmez Mot de passe</label>
                        <input
                            className=" " 
                            id="cf_password" 
                            type="password"
                            placeholder="Confirmez le mot de passe" 
                            {...formik.getFieldProps('cf_password')}
                        />
                        {formik.touched.cf_password && formik.errors.cf_password ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.cf_password}</div>
                        ) : null}
                    </div>
                   
                    <div className="custom-control custom-checkbox pt-3 pb-3">
                         <input type="checkbox" className="custom-control-input" id="customCheck1" 
                         {...formik.getFieldProps('acceptTerms')}/>
                         <label className="custom-control-label" htmlFor="customCheck1">Acceptez les termes de confidentialité</label>
                         {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.acceptTerms}</div>
                        ) : null}
                    </div>


                    <div className="wrap-btn mb-2">
                <div className="login-form-bgbtn" />
                    <button className="login-form-btn " type="submit">
                    {formik.isSubmitting ? "Creating..." : "inscription"}
                    </button>
                </div>
                <div className="or-seperator"><b>ou</b></div>
                <div className="social-btn text-center">
                    <a href="#" className="btn btn-primary btn-lg bg-primary "><i className="icon-facebook "></i> </a>
                    <a href="#" className="btn btn-info btn-lg"><i className="icon-twitter"></i> </a>
                    <a href="#" className="btn btn-danger btn-lg"><i className="icon-google"></i> </a>
                    </div>
                </form>
                <p className="mt-5 mb-4">Already an account? <Link to="/Login">Login</Link> </p>
                </>
               )} 
            </Formik>
            
        </div>
    </>
  )
}


