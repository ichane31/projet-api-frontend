import React , { useState, useEffect, useRef } from 'react';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import Helmet from "react-helmet";
import { Formik} from 'formik';
import {useAuth} from '../hoc/useAuth';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import '../css/Form.css';
import {DelAccount , PutMePassword} from '../services/UserService';
import {getItemFromStorage} from '../helpers/helper';
import {useNavigate} from 'react-router-dom';

const AccountSetting = () => {

    const toast = useRef(null);
    const {user} = useAuth();
    const token = getItemFromStorage('token');

    const inputRef = useRef();
    const resetFileInput = ( ) => {
        inputRef.current.value = null;
    }
    const navigate = useNavigate();
    const [text , setText ] = useState('')

    const deleteAccount = async () =>  {
      let val = new FormData();
      val.append('password' , text);

      var requestOptions = {
        method: 'DELETE',
        body: val,
        headers: {"Authorization": "Bearer " +token},
        redirect: 'follow'
      };

      if (window.confirm('Vous étes sur de vouloir supprimer votre  compte ?')){
        try{
          let res = await DelAccount(requestOptions)
          if (res.ok){
              let d = await res.json();
              toast.current.show({ severity: 'success', summary: 'Created!', detail: "Compte supprimé ", life: 3000 });
              window.localStorage.clear();
              navigate('/');
             
             
          }
          else{
              if(Array.isArray(res) && res.length === 0) return "error";
              let r = await res.json()
              throw r[0]?.message;
          }
        }
        catch (err){
            console.log("err: ", err);
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
      }
    
    }

    const onSubmitForm = (event) => {
      event.preventDefault();
      deleteAccount();
      setText('');

    };

  return (
    <>
      <Helmet>
            <script>
                document.title = "Parametres du compte "
            </script>
        </Helmet>
        <Toast ref={toast} />
        <div className=" account  bg-gray-100">
          <div className='accountUser'>
            <div className='accountUserDiv'>
              <h5>Changer de mot de passe</h5>
              <Formik
                initialValues = {{currentPassword:'',password:'', cf_password:''}}
                validationSchema={Yup.object({
                    currentPassword: Yup.string()
                    .min(8, "trop petit")
                    .max(50 , "trop long!")
                    .required("Mot de passe actuel obligatoire"),
                    password: Yup.string()
                    .min(8, "trop petit")
                    .max(50 , "trop long!")
                    .required("Mot de passe  obligatoire")
                    // .matches(!/^[\w]+$/ , 'Mot de passe doit contenir au moins un caractère spacial'),
                    ,
                    cf_password: Yup.string()
                    .min(8, "trop petit")
                    .max(50 , "trop long!")
                    .required("Mot de passe  obligatoire")
                    .oneOf(
                      [Yup.ref("password"), null],
                      "Le mot de passe de confirmation ne correspond pas"
                  ),
                  
                })}

                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  let data = new FormData();
                  for (let value in values) {
                      data.append(value, values[value]);
                  }
                  setSubmitting(true);

                  var requestOptions = {
                      method: 'PUT',
                      body: data,
                      headers: {"Authorization": "Bearer " +token},
                      redirect: 'follow'
                  };
                  
                  if (window.confirm("Etes vous sur de vouloir changer de mot de passe maintenant ?.Vous serez deconnecté du site.")) {
                    try{
                      let res = await PutMePassword(requestOptions)
                      if (res.ok){
                          let d = await res.json();
                          toast.current.show({ severity: 'success', summary: 'Modifié!', detail: "Profile mis à jour avec success", life: 3000 });
                          window.localStorage.clear();
                          navigate('/');
                      }
                      else{
                          if(Array.isArray(res) && res.length === 0) return "error";
                          let r = await res.json()
                          throw r[0]?.message;
                      }
                  }
                  catch (err){
                      console.log("err: ", err);
                      toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
                  }
                  }
                  setSubmitting(false);
              }}
                
              >
                {(formik) => (
                    <form className='w-full' onSubmit={formik.handleSubmit} encType="multipart/form-data">
                      <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="w-full px-0 mb-0 md:mb-0 ">
                          <label className='' htmlFor="currentPassword">Mot de passe actuel*</label> {' '}
                            <InputText
                              className=" py-2 champ  " 
                              id="currentPassword" 
                              type="password"
                              placeholder="Mot de passe actuel" 
                              {...formik.getFieldProps('currentPassword')}
                            />
                              {formik.touched.currentPassword && formik.errors.currentPassword ? (
                                <div className="text-red-500 text-xs italic">{formik.errors.currentPassword}</div>
                              ) : null}
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="w-full px-0 mb-0 md:mb-0 ">
                          <label className='' htmlFor="password">Nouveau mot de passe*</label> {' '}
                            <InputText
                              className=" py-2 champ  " 
                              id="password" 
                              type="password"
                              placeholder="Nouveau mot de passe" 
                              {...formik.getFieldProps('password')}
                            />
                              {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-xs italic">{formik.errors.password}</div>
                              ) : null}
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="w-full px-0 mb-0 md:mb-0 ">
                          <label className='' htmlFor="password">Nouveau mot de passe*</label> {' '}
                            <InputText
                              className=" py-2 champ  " 
                              id="cf_password" 
                              type="password"
                              placeholder="Confirmer le nouveau mot de passe" 
                              {...formik.getFieldProps('cf_password')}
                            />
                              {formik.touched.cf_password && formik.errors.cf_password ? (
                                <div className="text-red-500 text-xs italic">{formik.errors.cf_password}</div>
                              ) : null}
                        </div>
                      </div>
                        <div className=" flex flex-wrap -mx-3 mb-6 justify-between w-full ">
                          <button className="shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" 
                            type="submit"
                            disabled={formik.isSubmitting}
                          >
                            {formik.isSubmitting ? "Changement..." : "Changer"}
                          </button>
                        </div>
                    </form>
                  )}

              </Formik>
            </div>
            <div className='accountUserDiv pt-5'>
              <h5>
                Supprimer le compte
              </h5>
              <div className='avertis'>
                  <p>Avertissement!!: Cet compte sera definitivement supprimer.</p>
              </div>
              
            </div>
            <div>
              <form onSubmit={onSubmitForm}  encType="multipart/form-data">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-0 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                      Mot de passe
                    </label>
                    <InputText
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                      id="name" 
                      type="password"
                      placeholder="Mot de passe" 
                      onChange={(e) => setText(e.target.value) }
                        
                    />
                  </div>
                  </div>
                    <div className="flex justify-end w-full px-3">
                      <button className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" 
                        type="submit"
                        
                      >
                        Supprimer mon compte
                        </button>
                      </div>
                  </form>
            </div>
          </div>
        </div>
      
    </>
  )
}

export default AccountSetting
