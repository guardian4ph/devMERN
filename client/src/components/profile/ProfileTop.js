import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileTop = ({
  profile: {
    status,
    profilepic,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <div>
        {profilepic === undefined || profilepic === null ? (
          <img className='profile-img' src={`/img/Spotter.png`} alt='...' />
        ) : (
          <img className='profile-img' src={`/img/${profilepic}`} alt='...' />
        )}
      </div>
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {/* check if company is provided by user */}
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span> at {location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <Link to={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </Link>
        )}
        {social && social.twitter && (
          <Link to={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </Link>
        )}

        {social && social.facebook && (
          <Link to={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </Link>
        )}

        {social && social.linkedin && (
          <Link to={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </Link>
        )}

        {social && social.youtube && (
          <Link to={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </Link>
        )}

        {social && social.instagram && (
          <Link to={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
