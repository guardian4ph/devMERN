import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <p className='x-large'>GUARDIAN</p>

          <p className='lead'>
            Create a profile, share posts and connect with other responders.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign-up
            </Link>
            <Link to='/Login' className='btn btn-light'>
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
