import React from 'react'
import {useParams} from 'react-router-dom'
import '../../css/auth.css'

const PasswordEmailSend = () => {
    const {email} = useParams();
  return (
    <div>
        <div className=" pass-email card ">
            <h4 className="">Email de réinitialisation</h4>
            <p className="">
                Un lien a éte envoyé au compte mail : {email}.
                Cliquez sur ce lien pour reinitialiser votre mot de passe.</p>
            <div>
                <p>
                    Le lien deviendra invalide dans : <span className='time'>15 min</span>
                </p>
            </div>    
        </div>
      
    </div>
  )
}

export default PasswordEmailSend
