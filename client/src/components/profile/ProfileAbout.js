import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p'>
      {bio && (
        <Fragment>
          <h3 className='text-primary'>{name.trim().split(" ")[0]}'s Bio</h3>
          <p>{bio}</p>
          <div className='line'></div>
        </Fragment>
      )}

      <h3 className='text-primary'>Skill Set</h3>
      <div className='skills'>
        {skills.map((skill, index) => (
          <div key={index} className='p'>
            <i className='fas fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
