import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <p className='x-large'>GUARDIAN</p>

          <p className='subTitle'>
            Create a profile, share posts and connect with other volunteers.
          </p>
          <div className='buttons'>
            <Link
              to='/register'
              className='btn btn-primary'
              style={{ width: "150px", marginRight: "3px" }}
            >
              Sign-up
            </Link>
            <Link
              to='/Login'
              className='btn btn-light'
              style={{ width: "150px", marginLeft: "3px" }}
            >
              Login
            </Link>
            <div className='small-txt'>
              <p>
                Geographic Unified Assistanace and Response to Distress
                Incidents with Agile Networking
              </p>
              <p>Computer Aided Dispatch and Civilian Reporting System</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
