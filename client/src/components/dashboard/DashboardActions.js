import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <Fragment>
      <div className='btnTitle'>
        <Link to='/edit-profile' className='btn  btn-primary btn-width'>
          <i className='fas fa-user-circle text-light'></i> <p>Profile </p>
        </Link>

        <Link to='/add-experience' className='btn btn-primary btn-width'>
          <i className='fab fa-black-tie text-light'></i>{" "}
          <p>Trainings/Experience</p>
        </Link>
        <Link to='/add-education' className='btn btn-primary btn-width'>
          <i className='fas fa-graduation-cap text-light'></i> <p>Education</p>
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardActions;
