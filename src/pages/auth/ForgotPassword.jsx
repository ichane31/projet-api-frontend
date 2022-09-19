import React , {useRef} from 'react';
import Helmet from "react-helmet"
import { Toast } from 'primereact/toast';
import { Formik, replace} from 'formik';
import * as Yup from 'yup';
import {ResetPassword} from '../../services/UserService';
import { useNavigate ,Navigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

const ForgotPassword = () => {

    const toast = useRef(null);
    const navigate = useNavigate();
  return (
    <>
        <Helmet>
            <script>
                document.title = "ForgotPassword"
            </script>
        </Helmet>
        <Toast ref={toast}/>
        <div className="fg_pass card ">
            <h3 className="justify-center ">Réinitialiser votre mot de passe</h3>
            <p>
                Mot de passe oublier? Entrez votre email.
                Vous receivrez un lien pour créer un nouveau mot de passe.
            </p>

            <Formik
                initialValues={{email:''}}
                validationSchema={Yup.object({
                    email: Yup.string()
                    .email('Email invalide')
                    .required('Email obliigatoire')
                })}
                onSubmit={async (values , {setSubmitting, resetForm}) =>  {
                    // const data = {
                    // email: values.email}
                    let data = new FormData();
                    for (let value in values) {
                        data.append(value , values[value]);
                        
                    }
                    
                    setSubmitting(true);
                    
                    var requestOptions = {
                        method: 'POST',
                        body: data ,
                        redirect: 'follow'
                    };
                    try {
                        let res = await ResetPassword(requestOptions);
                        if (res.ok) {
                            resetForm();
                            navigate(`/Password/${values.email}/Passwordemailsend` )
                            
                        }
                        else {
                            if(Array.isArray(res) && res.length === 0) return "error";
                            let err = await res.json();
                            throw err[0].message;
                        }
                        
                    } catch (error) {
                        console.log(error)
                        toast.current.show({ severity: 'error', summary: 'Failed', detail: error, life: 3000 });
                        
                    }
                    setSubmitting(false)
                    
                    
                }}
            >
                {(formik) => (
                <div>
                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <div className='row'>
                            {/* <label className="ml-0" htmlFor="">Entrez votre email</label> */}
                            <InputText type="email" name='email' id='email'
                                placeholder="Email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email? (
                            <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
                            ) :null}
                        </div>
                        <div className=" btnverifie flex justify-center w-full px-3">
                            <button className=" " 
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                            {formik.isSubmitting ? "Verification..." : "Verifier email"}
                            </button>
                        </div>
                    </form> 
                    <div className='dont '>
                        <div className='d-flex pt-4 dontDiv'>
                        <h6>Vous n'avez pas de compte?</h6>
                        <a className='card' href="/Register"> Créer un compte</a> 
                        </div>
                    </div>
                    </div>   
                )}

            </Formik>
        </div>
      
    </>
  )
}

export default ForgotPassword


