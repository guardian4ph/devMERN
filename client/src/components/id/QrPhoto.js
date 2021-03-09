import { React, useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import profile from "../../reducers/profile";
import { QRCode } from "react-qrcode-logo";

const QrPhoto = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth,
}) => {
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "60%",
                  borderRadius: " 5px 5px 0px 0px",
                  backgroundColor: "#fff",
                  alignItems: "center",
                }}
              >
                <div className='qr-code-id-big'>
                  <QRCode
                    size='320'
                    includeMargin='true'
                    fgColor='#333'
                    value={profile.user._id}
                  />
                </div>
              </div>
              <div style={{ height: "5px", backgroundColor: "#eee" }}></div>

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
                    width: "100%",
                    height: "100%",
                    margin: "auto",

                    padding: "20px",
                    borderRadius: "0 0 0 5px",
                    color: "#333",
                  }}
                >
                  <h4>
                    {profile.area} , {profile.city}
                  </h4>
                  <p> {profile.completeaddress}</p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

QrPhoto.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile })(QrPhoto);
