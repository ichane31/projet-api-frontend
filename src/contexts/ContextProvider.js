import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  userProfile: false,
};

export const ContextProvider = ({ children }) => {

  const [isClicked, setIsClicked] = useState(initialState);
  const [pathname, setPathName] = useState();

  const setPath = () => {
    const pathName = window.location.pathname.substring(1);
    setPathName(() => {
      return ( [
          {label: pathName},
      ])
    })
    localStorage.setItem('currentPath', pathName);
  }

  
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: !isClicked.userProfile });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ pathname,setPath ,setPathName, handleClick, isClicked, initialState, setIsClicked}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);