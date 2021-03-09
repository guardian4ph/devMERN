import { React, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import profile from "../../reducers/profile";

const Id = ({ getCurrentProfile, profile: { profile, loading }, auth }) => {
  useEffect(() => {
    getCurrentProfile();
    console.log(profile);
  }, [getCurrentProfile]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='id-container'>
            <div
              style={{
                background: "#666",
                width: "60px",
                height: "10px",
                borderRadius: "5px",
              }}
            ></div>
            <div
              style={{
                width: "99%",
                border: "1px #ddd solid",
                borderRadius: "5px",
                marginTop: "10px",
                height: "100%",
              }}
            >
              <Link to='/QR'>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // padding: "10px",
                    height: "32%",
                    borderRadius: " 5px 5px 0px 0px",
                    // backgroundColor: "#AFBFC6",
                    backgroundColor: "#fff",
                    alignItems: "center",
                  }}
                >
                  <div style={{ margin: "auto" }}>
                    <img
                      className='profile-img'
                      src={`/img/${profile.profilepic}`}
                      alt=''
                    />
                  </div>

                  <small> Tap photo to show QR code</small>
                  {/* <div className='qr-code-id'>
                  <QRCode
                    size='125'
                    includeMargin='true'
                    fgColor='#333'
                    value={profile.user._id}
                  />
                </div> */}
                </div>
              </Link>
              <div style={{ height: "5px", backgroundColor: "#eee" }}></div>
              <div className='id-container-validity'>
                Valid Until: Dec. 31, 2021
              </div>
              <div className='id-container-name'>
                <h2>
                  {profile.user.lname} , {profile.user.name}
                </h2>
              </div>
              <div style={{ height: "2px", backgroundColor: "#eee" }}></div>
              <p
                style={{
                  background: "#fff",
                }}
              >
                Complete Name
              </p>
              <div className='id-container-access'>
                <h5>Authorized Persons Outside Residence</h5>
              </div>
              <div style={{ height: "5px", backgroundColor: "#eee" }}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  lineHeight: "20px",
                  padding: "30px 10px 10px 10px",
                  height: "22%",

                  background: "#fff",
                }}
              >
                <h1>{profile.status}</h1>
                <p className='post-date p-11'>at</p>
                <h3> {profile.organization}</h3>
              </div>
              <div style={{ height: "2px", backgroundColor: "#eee" }}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "16%",
                  borderRadius: " 0px 0px  5px 5px",
                  backgroundColor: "#AFBFC6",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "50%",
                    height: "100%",
                    margin: "auto",

                    padding: "20px",
                    borderRadius: "0 0 0 5px",
                    color: "#333",
                  }}
                >
                  <h4> {profile.area} </h4>
                  <p> Operation Center</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    margin: "auto",
                    width: "50%",
                  }}
                >
                  <img
                    className='post-profile'
                    src={`/img/${profile.profilepic}`}
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Id.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile })(Id);
