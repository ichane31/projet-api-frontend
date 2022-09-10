import React from 'react'

const LogOut = (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  
}

export default LogOut
