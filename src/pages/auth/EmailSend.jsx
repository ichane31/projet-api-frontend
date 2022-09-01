import React from 'react'
import {useParams } from 'react-router-dom'
import '../../css/emailSend.css';
const EmailSend = () => {
   
    const {userEmail} = useParams();
   
  return (
    <div className="divEmail  ">
    <form className="mt-5 justify-content-center">
        <h3 className="">Confirmation du compte</h3>
        <br />
        <p className="text-center mb-4 ">
            Un Email avec le lien de confirmation de votre compte a été envoyé à votre email : <b>{userEmail}</b>
        </p>
        <p className="text-center">
        Vérifiez votre e-mail et revenez pour continuer !
        </p>
        <button className="btn email_btn bg-success text-black mb-3" > <a className="text-center text-white" href="/Login">Connection</a></button>
    </form>
      
    </div>
  )
}

export default EmailSend
