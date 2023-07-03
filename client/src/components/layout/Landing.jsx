import React from 'react'
import {NavLink,Navigate} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Developers Spot</h1>
        <p className="lead">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="buttons">
          <NavLink to="/register" className="btn btn-primary">Sign Up</NavLink>
          <NavLink to="/login" className="btn btn-light">Login</NavLink>
        </div>
      </div>
    </div>
    </>
  )
};
Landing.PropTypes={
  isAuthenticated:PropTypes.bool
}
 const mapStateToProps =state=>({
    isAuthenticated:state.auth.isAuthenticated
 })

export default connect(mapStateToProps)(Landing)