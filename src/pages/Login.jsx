
import {Redirect } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';
import '../css/login.css';
import '../css/main.css';

import React, {useRef} from 'react'
import Helmet from "react-helmet"
import { Toast } from 'primereact/toast';
import { Formik} from 'formik';
import * as Yup from 'yup';
import {LoginUser , GetMe } from '../services/UserService';


const Login = () => {
    const toast = useRef(null);

    const inputRef = useRef(null);

    const resetFileInput = () => {
        inputRef.current.value = null;
    };
    return(
        <>
        <Helmet>
                <script>
                    document.title = "Nouvelle Catégorie"
                </script>
        </Helmet>
        <Toast ref={toast} />
        <div className='limiter'>
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    
                
                <Formik
                    initialValues={{ email: '', password: ''}}
                    validationSchema={Yup.object({
                        email: Yup.string()
						.email('Email invalide')
                        .required('Email obliigatoire'),

                        password: Yup.string()
						.min(8 , 'au moins 8 chiffre')
                        .max(250, 'Must be 250 characters or less')
                        .required('mot de passe obligatoire'),

                        })
                    }
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
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
                            let res = await LoginUser(requestOptions)
                            if (res.ok){
                                let d = await res.json();
                                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Vous éte connecté", life: 3000 });
                                resetForm();
                                // resetFileInput();
                                // navigate(`/Acceuil`)
                                localStorage.setItem('userId',d.id);
                                localStorage.setItem('token',d.token);
                                
                                // const loggedInUser = await Parse.User.logIn();
                                // console.log(Parse.User.current());
                                const  headers ={
                                    headers: {'Authorization':"Bearer" + localStorage.getItem('token')}
                                }
                        
                                let user = await GetMe(headers);
                                
                                console.log(user);

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

                        // try {
                        //     const loggedInUser = await Parse.User.logIn(data);
                        //     alert ('You are loggedIn');
                        // }
                        // catch {}
                        
                        
                        setSubmitting(false);
                    }}
                >
                    {(formik) => (
                        <form className="w-full" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                           <span className="login100-form-title p-b-49">Connection</span> 
						   <div className ="wrap-input100 validate-input m-b-23" data-validate='email is required'>
                                <span className='label-input100'>Addresse email</span>
                 			    <input type="text" 
                       				className='input100'
                       				name="email"
                       				placeholder='Entrez votre addresse email'
									   {...formik.getFieldProps('email')}
                   				 />
								 
                  				<span className="focus-input100" data-symbol="" />
								  {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
                                    ) : null}
                			</div>
							<div className="wrap-input100 validate-input" data-validate="Password is required">
								<span className="label-input100">Mot de passe</span>
								<input
									className="input100"
									type="password"
									name="password"
									placeholder="Entrez votre mot de passe"
									{...formik.getFieldProps('password')}
								/>
								<span className="focus-input100" data-symbol="" />
								{formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-xs italic">{formik.errors.password}</div>
                                    ) : null}
							</div>
              				<div className="text-right p-t-25 p-b-32">
			 					 <a href="/forgetPassword">Mot de passe oublié?</a>
							</div>
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn" />
									<button type="submit" className="login100-form-btn">Connection</button>
								</div>
							</div>
							<div className="or-seperator"><b>ou</b></div>
							<div className="flex-c-m">
								<a href="#" className="login100-social-item bg1">
									<i className="fa fa-facebook" />
								</a>
								<a href="#" className="login100-social-item bg2">
									<i className="fa fa-twitter" />
								</a>
								<a href="#" className="login100-social-item bg3">
									<i className="fa fa-google" />
								</a>
							</div>
							<div className="flex-row p-t-30 " style={{  justifyContent: 'space-between' }}>
                               <span className="txt1 p-b-15"> Create Account</span>{'  '}
                				<div><a href="/Register" className="txt2">Sign Up</a></div>
               				    <div></div>
                				<div></div>
             				</div>
                        </form>
                    )}
                </Formik>
				</div>
            </div>
        </div>
		<div id="dropDownSelect1" />
        </>
    )
}
export default Login;