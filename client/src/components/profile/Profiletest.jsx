import React ,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { NavLink, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileGithub from './ProfileGithub'
import formatDate from '../../utils/formatDate'
const Profile = ({getProfileById,profile:{profile,loading},auth}) => {
    const { id } = useParams();
    useEffect(()=>{
     
        getProfileById(id);
    },[getProfileById]);

  return (
    <>
      {profile===null || loading ?<Spinner/>:<> </>}
      <NavLink to='/profiles' className='btn btn-light'>Back To profiles</NavLink>
      {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <NavLink to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </NavLink>
            )}
            <div className="profile-grid my-1">
            <ProfileTop profile={profile}/>
            <ProfileAbout profile={profile}/>

            {/* displaying experience */}
              <div className='profile-exp bg-white p-2'>
             <h2 className="text-primary">Experience</h2>
             {(profile && profile.experience.length > 0) ? (
           <>
            {profile.experience.map((exp) => {
              return<>
               <div>
                 <h3 className="text-dark">{exp.company}</h3>
                <p>
                  {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
                </p>
                <p>
                  <strong>Position: </strong> {exp.title}
                </p>
                <p>
                  <strong>Location: </strong> {exp.location}
                </p>
               <p>
                  <strong>Description: </strong> {exp.description}
                </p>
              </div> 
             
              </>;
                })}
               </>
              ) : (
              <>No Experience Credentials</>
              )}
            </div>

            {/* displaying education */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((edu) => (
                    <>
                <div>
                <h3 className="text-dark">{edu.school}</h3>
                <p>
                  {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
                </p>
                <p>
                  <strong>Degree: </strong> {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong> {edu.fieldofstudy}
                </p>e
                <p>
                  <strong>Description: </strong> {edu.description}
                </p>
              </div>
                    </>
                    
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
            </div>
    </>
  )
}

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps =state=>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToProps,{getProfileById})(Profile) 