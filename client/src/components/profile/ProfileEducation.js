import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <div style={{ marginLeft: "8px", fontSize: "13px" }}>
      <h4 className='text-primary'> {school}</h4>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong> Degree</strong> {degree}
      </p>
      <p>
        <strong> Field of Study</strong> {fieldofstudy}
      </p>
      <p>
        <strong> Description</strong> {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
