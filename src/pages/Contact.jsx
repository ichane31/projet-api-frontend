import React , {useState} from 'react'
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/contact.css'
import Helmet from "react-helmet";
import { Formik} from 'formik';
import * as Yup from 'yup';
const Contact = () => {
    
  return (
    <>
    <Helmet>
        <script>
          document.title = "Contact "
        </script>
    </Helmet>
    <section className="contact-section">
      <div className="container">
        <ToastContainer position="top-center" />
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="wrapper">
              <div className="row no-gutters">
              <div className="col-md-6">
                <div className="contact-wrap w-100 p-lg-5 p-4">
                  <h3 className="mb-4">Envoyez nous un message</h3>
                  <Formik 
                    initialValues={{ name: '', email: '', subject:'',message:''}}
                    validationSchema={Yup.object({
                      name: Yup.string()
                      .min(3 , 'trop petit')
                      .max(25 , 'nom trop mon long'),
                      email: Yup.string()
                      .email('Email invalide')
                      .required('Email obliigatoire'),

                      subjet: Yup.string()
                      .min(8 , 'au moins 8 caracteres')
                      .max(50, 'sujet trp long')
                      .required('sujet obligatoire'),
                      message: Yup.string()
                      .min(10 , 'veillez detaillé votre message')
                      .max(250 , 'votre message est trop long')

                      })
                    }
                    onSubmit={ async (values, {setSubmitting,resetForm}) =>{
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
                        } }>

                          {(formik) => (
                             <form id="contactForm" className="contactForm" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <input style={{background: 'transparent'}}
                                      type="text"
                                      className="form-control"
                                      name="name"
                                      placeholder="Nom"
                                      {...formik.getFieldProps('name')}
                                      
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <input style={{background: 'transparent'}}
                                      type="email"
                                      className="form-control"
                                      name="email"
                                      placeholder="Adresse mail"
                                      {...formik.getFieldProps('email')}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <input style={{background: 'transparent'}}
                                      type="text"
                                      className="form-control"
                                      name="subject"
                                      placeholder="Sujet"
                                      {...formik.getFieldProps('subject')}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <textarea style={{background: 'transparent'}}
                                      type="text"
                                      className="form-control"
                                      name="message"
                                      placeholder="Message"
                                      cols="30"
                                      rows="6"
                                      {...formik.getFieldProps('message')}
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <input
                                      type="submit"
                                      value="Envoyer"
                                      className="btn btn-primary"
                                    />
                                  </div>
                                </div>
                              </div>
                             </form>
                            )}
                  </Formik>

                </div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch">
                <div className="info-wrap w-100 p-lg-5 p-4 img">
                  <h3>Contactez-nous</h3>
                  <p className="mb-4">
                    Nous sommes ouvert à toute suggestion
                  </p>
                  <div className="dbox w-100 d-flex align-items-start">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-map-marker"></span>
                    </div>
                    <div className="text pl-3">
                      <p>
                        <span>Address:</span> 198 West 21th Street, Suite 721
                         EL JADIDA NY 10016
                      </p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-phone"></span>
                    </div>
                    <div className="text pl-3">
                      <p>
                        <span>Phone:</span>
                        <a href="tel://123456789">+1235 2355 98</a>
                      </p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-paper-plane"></span>
                    </div>
                    <div className="text pl-3">
                      <p>
                        <span>Email:</span>
                        <a href="mailto:info@yoursite.com">
                          info@yoursite.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-globe"></span>
                    </div>
                    <div className="text pl-3">
                      <p>
                        <span>Website:</span>
                        <a href="#">yoursite.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Contact
