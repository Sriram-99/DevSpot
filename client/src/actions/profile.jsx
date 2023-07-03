import axios, { formToJSON } from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE } from "./types";
import setAuthToken from '../utils/setAuthToken';


// getting curr users profile
export const getCurrentProfile =()=>async dispatch =>{
    try{
        console.log("hello profile/me");
        const res= await axios.get('http://localhost:5000/api/profile/me');
        console.log(res.data);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
       
        const body =JSON.stringify(formData);
       
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

      const res = await axios.post('http://localhost:5000/api/profile', body,config);
        console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      navigate('/dashboard');
    
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR, 
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

 // Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
   
       console.log(formData);
       const body =JSON.stringify(formData);
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

      const res = await axios.put('http://localhost:5000/api/profile/experience', body,config);
        console.log(res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));
    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const body =JSON.stringify(formData);
       
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

      const res = await axios.put('http://localhost:5000/api/profile/education', body,config);


    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
