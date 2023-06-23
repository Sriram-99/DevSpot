import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLinks=(
    <ul>
    <li><a onClick={logout} href="!#">
    <i className='fas fa-sign-out-alt'></i>{' '}
    <span className='hide-sm'>Logout</span>
    </a></li>
  </ul>
  );
  const guestLinks=(
    <ul>
    <li><a href="#!">Developers</a></li>
    <li><NavLink to="/register">Register</NavLink></li>
    <li><NavLink to="/login">Login</NavLink></li>
  </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to ="/"><i className="fas fa-code"></i> DevSpot</NavLink>
      </h1>
      {!loading &&(<>{isAuthenticated?authLinks:guestLinks}</>) }
    </nav>
  )
}

Navbar.prototype={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
// const mapStateToProps=state =>({
//   isAuthenticated:state.auth.isAuthenticated
// })

const mapStateToProps =state=>({
  auth:state.auth
})
export default connect(mapStateToProps,{logout})(Navbar);