import React from 'react';
import '../css/App.css';
import {useAuth} from '../hoc/useAuth';
import {useNavigate} from 'react-router-dom';

const Verification = () => {
    const navigate = useNavigate();

    const { user} = useAuth();
//     if (user) {
//         navigate('/')
//     }
//     else {
//     navigate('/login');
// }
  return (
    <div className='justify-center align-center verif'>
        <div className='justify-center align-center verif'>
        <i className="pi pi-spin pi-spinner" style={{'fontSize': '4em'}}></i>
        </div>
    </div >
  )
}

export default Verification
