import React, {useState} from 'react'
import {Link,useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types'

const Login = ({login,isAuthenticated}) => {
  const navigate = useNavigate();

  const [formData,setFormData]=useState({
    email:'',
    password:'',
  });
  
  const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})
  const onSubmit= async e=>{
    const {email,password}=formData;
    console.log(email);
    console.log(password)
    e.preventDefault();
     login({email,password});
  };

  // redirect if loged in 
  if(isAuthenticated){
    navigate('/dashboard');
  }
  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign In To Your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          value={formData.email} 
          onChange={e=> onChange(e)} 
          required/>
          {/* <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small> */}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={formData.password} onChange={e=> onChange(e)} required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </>
  )
}

Login.prototype= {
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};
const mapStateToProps=state =>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login)