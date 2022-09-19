import React ,{useRef} from 'react';
import {useParams} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import '../../css/auth.css';
import {PostResetPasswordToken} from '../../services/UserService';


const ResetPassword = () => {
    const {token } = useParams();
    console.log(token)
    const toast = useRef(null);
 
  return (
    <>
    <Helmet>
             <script>
                 document.title = "Réinitialiser mot de passe"
             </script>
     </Helmet>
     <Toast ref={toast} />
    <div children="fg_pass ">
        <div className='resetPas card'>
        <h4 className='mb-4'>Réinitialiser votre mot de passe</h4>
        <p>Le mot de passe doit avoir au moins 8 caractère avec un caractère spécial.</p>

        <Formik 
            initialValues={{password:'', cf_password:''}}
            validationSchema={Yup.object({
              password:Yup.string()
              .min(8, "Mot de passe doit être plus grand que 8 caractères")
              .max(50, "Mot de passe doit être plus petit que 50 caractères")
              ,
              cf_password: Yup.string()
              .required("Confirmation de mot de passe est obligatoire")
              .oneOf(
                  [Yup.ref("password"), null],
                  "Le mot de passe de confirmation ne correspond pas"
              ),
            })}

            onSubmit={async (values , {setSubmitting , resetForm}) => {
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

                  try {
                     let res = await PostResetPasswordToken(token , requestOptions);
                     if (res.ok) {
                      toast.current.show({ severity: 'success', summary: '', detail: "Mot de passe réinitialisé", life: 3000 });
                    } else {
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
          {(formik) =>  (
              <form className="w-full" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="flex flex-wrap">
                    <div className="w-full py-3 ">
                        <label className='' htmlFor="firstname">Mot de passe</label>
                        <InputText 
                            className="w-full py-2 resetINp" 
                            id="password" 
                            type="password"
                            placeholder="Mot de passe" 
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="w-full py-3">
                        <label className='' htmlFor="firstname">Confirmer mot de passe</label>
                        <InputText
                            className="w-full py-2 " 
                            id="cf_password" 
                            type="password"
                            placeholder="Confirmer le mot de passe" 
                            {...formik.getFieldProps('cf_password')}
                        />
                        {formik.touched.cf_password && formik.errors.cf_password ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.cf_password}</div>
                        ) : null}
                    </div>
                    <div className="flex justify-between w-full ">
                        <button className="shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" 
                          type="submit"
                          disabled={formik.isSubmitting}
                          >
                          {formik.isSubmitting ? "Réinitialisation..." : "Réinitialiser"}
                        </button>
                    </div>
                </div>
              </form>
            )}

        </Formik>
        </div>
      
    </div>
    </>
  )
}

export default ResetPassword
