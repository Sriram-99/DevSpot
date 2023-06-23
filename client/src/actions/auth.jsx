import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT } from './types';
import setAuthToken from '../utils/setAuthToken';
// LOAD USER
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        const storedToken = localStorage.getItem('token');
        console.log(storedToken);
        setAuthToken(localStorage.getItem('token'))

        // setAuthToken(localStorage.token)
    }
    try{
        const res=await  axios.get('http://localhost:5000/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
       
    }
    catch(err){
        dispatch({
            type:AUTH_ERROR,
           
        });
    }
}

 //register user
 export const register=({name,email,password}) => async dispatch => {
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body =JSON.stringify({name,email,password});
    try{
        const res=await axios.post('http://localhost:5000/api/users',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload :res.data
        });
        dispatch(loadUser());
    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:REGISTER_FAIL
        })
        
    }
 }

 // login user
 export const login =({email,password}) => async dispatch => {
    
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    console.log(email);
    const body =JSON.stringify({email,password});
    try{
        
        const res=await axios.post('http://localhost:5000/api/auth',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload :res.data
        });
        dispatch(loadUser());
    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
 };
 // logout // clear profiles

 export const logout=()=>dispatch=>{
    dispatch({type:LOGOUT});
 }