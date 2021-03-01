import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div style={{ background: "#fff", padding: "1rem", borderRadius: "5px" }}>
        {/* <h1 className='large text-primary'>Profile Dashboard</h1> */}
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome, {user && user.name}{" "}
          {user && user.lname}
        </p>
        {profile !== null ? (
          <Fragment>
            <div>
              <DashboardActions />
              {/* pass the experience array from state */}
              <Experience experience={profile.experience} />
              {/* pass the education array from state */}
              <Education education={profile.education} />
              <div className='my-2'>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteAccount()}
                >
                  <i className='fas fa-user-minus'></i> Delete My Account
                </button>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>
              {" "}
              You have not yet added a profile, please add your information
            </p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              {" "}
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
