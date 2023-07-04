import axios, { formToJSON } from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,ACCOUNT_DELETED ,LOGOUT,GET_PROFILES,GET_REPOS} from "./types";
import setAuthToken from '../utils/setAuthToken';



// getting curr users profile
export const getCurrentProfile =()=>async dispatch =>{
    try{
       
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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    console.log("hello in profilesess");
    const res = await axios.get('http://localhost:5000/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    console.log(userId)
    const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
    console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    console.log("hello");
    // const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
    const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
    console.log(res);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS
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


// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`);
    // const res = await api.delete(`/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);
    // const res = await api.delete(`/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      console.log("hello ");
      await axios.delete('http://localhost:5000/api/profile');
      console.log("hello after rees");
      
      dispatch({type:LOGOUT});
      dispatch(setAlert('Your account has been permanently deleted'));
      dispatch({type:CLEAR_PROFILE});

      dispatch(setAlert('Your account has been permanently deleted'));
      
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
