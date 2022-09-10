
import {createContext , useEffect , useReducer ,useState} from 'react';
import {getItemFromStorage , setItemInStorage , removeItemFromStorage } from '../helpers/helper';
import {GetMeDetails } from '../services/UserService';


export const AuthContext = createContext()

let $user = getItemFromStorage('user');
const $token = getItemFromStorage('token');



export const authReducer = (state={isAuthenticated: false}, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
        return {...state};
        // case 'LOGIN_USER':
        //     return {  ...state, loginUser: action.payload,isAuthenticated : true }
        case 'USER':
            return {  ...state, user: action.payload ,isAuthenticated : true }
        case 'LOGOUT_USER':
            return { ...state ,user: "" , isAuthenticated: false}
        case "LOGIN_ERROR":
            return { ...state ,  errorMessage: action.error};
        default:
            // throw new Error(`Unhandled action type: ${action.type}`);
            return state        
    }
}

export const AuthProvider = ({children })  =>  {
    
    const [state, dispatch] = useReducer(authReducer ,$user);

    useEffect( () =>  {
   
        async function currentUser() {
            try{
                if($token){
                    let res = await GetMeDetails($token);
                    if (res.ok) {
                        dispatch({type: 'USER' , payload : $user})

                        if($user.role === 1) {
                            setItemInStorage('admin',$user);
                        }
                           
                    } else {
                        let err = await res.json();
                        throw err[0].message;
                    }

                    
                }
                else{
                    
                    throw 'You mut login'
                }
            }
            catch(err){
                removeItemFromStorage('user');
                removeItemFromStorage('token')
                
            }
        }
        currentUser()

    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
     )


}