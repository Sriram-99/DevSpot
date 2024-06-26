import React from 'react'
import { useEffect } from 'react'
import Spinner from "../layout/Spinner"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getProfiles} from "../../actions/profile";
import ProfileItem from './ProfileItem'
const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
  useEffect(()=>{
    getProfiles();
  },[getProfiles])
  return (
    <>
      {loading? <Spinner/>:<>
      <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? 
            (
              profiles.map((profile,index) => (
               
                <ProfileItem key={index} profile={profile} /> 
              ))
            ) 
            : (
              <h4>No profiles found...</h4>
            )}
          </div>
      </>}
    </>
  )
}

Profiles.propTypes = {
  getProfiles:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired
}

const mapStateToProps =state =>({
    profile:state.profile
})
export default connect(mapStateToProps,{getProfiles})(Profiles)