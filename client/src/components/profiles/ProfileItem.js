import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, lname, avatar },
    status,
    organization,
    profilepic,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <Link to={`/profile/${_id}`}>
        <img className='profile-img' src={`/img/${profilepic}`} alt='...' />
      </Link>
      <div>
        <h3 className='profile-exp-h2'>
          {name} {lname}
        </h3>
        <p className='lead'>
          <b> {status} </b>
          {organization && (
            <span>
              {" "}
              <br /> @ {organization}
            </span>
          )}
        </p>
        <p className='my'> {location && <span> {location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
