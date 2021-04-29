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

          <p className='subTitle'>
            Command your teams and Control your resources
          </p>
          <div className='buttons' style={{ paddingTop: "5px" }}>
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
            <div className='buttons'>
              <p style={{ paddingTop: "30px" }}>
                Register your Operation Center here
              </p>
              <div
                style={{
                  fontSize: ".7rem",
                  bottom: "1rem",
                  letterSpacing: "1.2px",
                  fontWeight: "200",
                  color: "fff",
                }}
              >
                <p>For Local Goverment Units, Volunteer Organization...</p>
              </div>
              <Link
                to='/typeopcen'
                className='btn btn-light'
                style={{ width: "303px", marginLeft: "3px" }}
              >
                Create Operation Center
              </Link>
            </div>
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
