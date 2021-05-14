import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const Dashboard_opcen = ({
  opcen,
  opcenprofile: { profile, profiles, loading },
}) => {
  // const [displayProfileEdit, toggleProfileEdit] = useState(false);
  // useEffect(() => {});

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{
          padding: "10px",
          background: "#fff",
          borderRadius: "10px",
          height: "72vh",
        }}
      >
        <div
          style={{
            display: "block",
            borderRadius: "10px",
            padding: "5px",
            lineHeight: "1px",
          }}
        >
          <small className='small-txt-blk'>
            Command and control your resources using this panel.
          </small>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "150px",
            justifyContent: "space-around",
          }}
        >
          <div className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-building' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Profile</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (update your opcen profile)
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "3px",
                }}
              >
                {profile === null ? (
                  <Link to='/addoperation-center/profile'>
                    <i className='fa fa-plus-square-o fa-xs'></i>
                  </Link>
                ) : (
                  <Link to={`/edit-operation-center/profile/${profile._id}`}>
                    <i className='fa fa-pencil fa-xs'></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-users' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Responders</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (manage you responders)
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "3px",
                }}
              >
                {profile === null ? (
                  <Link to='/addoperation-center/profile'>
                    <i className='fa fa-plus-square-o fa-xs'></i>
                  </Link>
                ) : (
                  <Link to={`/edit-operation-center/profile/${profile._id}`}>
                    <i className='fa fa-pencil fa-xs'></i>
                  </Link>
                )}
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-cogs' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Teams</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (manage/monitor your teams)
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "3px",
                }}
              >
                {profile === null ? (
                  <Link to='/addoperation-center/profile'>
                    <i className='fa fa-plus-square-o fa-xs'></i>
                  </Link>
                ) : (
                  <Link to={`/edit-operation-center/profile/${profile._id}`}>
                    <i className='fa fa-pencil fa-xs'></i>
                  </Link>
                )}
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-ambulance' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Vehicles</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (manage your mobile assets)
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "3px",
                }}
              >
                {profile === null ? (
                  <Link to='/addoperation-center/profile'>
                    <i className='fa fa-plus-square-o fa-xs'></i>
                  </Link>
                ) : (
                  <Link to={`/edit-operation-center/profile/${profile._id}`}>
                    <i className='fa fa-pencil fa-xs'></i>
                  </Link>
                )}
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-h-square' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Facilities</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (facilities operating/monitoring)
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "3px",
                }}
              >
                {profile === null ? (
                  <Link to='/addoperation-center/profile'>
                    <i className='fa fa-plus-square-o fa-xs'></i>
                  </Link>
                ) : (
                  <Link to={`/edit-operation-center/profile/${profile._id}`}>
                    <i className='fa fa-pencil fa-xs'></i>
                  </Link>
                )}
              </div>
            </div>
          </Link>
        </div>
        {/* Another row start */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Link className='bigIcon'>
            <div style={{ marginTop: "20%" }}>
              <i className='fa fa-map' aria-hidden='true'></i>
              <p>Live Map</p>
              <div
                style={{ fontSize: "9px", lineHeight: "10px", color: "#333" }}
              >
                (current location of your responders and other resources)
              </div>
            </div>
          </Link>
          <Link className='bigIcon'>
            <div style={{ marginTop: "20%" }}>
              <i className='fa fa-bullhorn' aria-hidden='true'></i>
              <p>Notifications</p>
              <div
                style={{ fontSize: "9px", lineHeight: "10px", color: "#333" }}
              >
                (notify your contituents about urgent matters concerning the
                city)
              </div>
            </div>
          </Link>
          <Link className='bigIcon'>
            <div style={{ marginTop: "20%" }}>
              <i className='fa fa-area-chart' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p>Incident</p>
              <div
                style={{ fontSize: "9px", lineHeight: "10px", color: "#333" }}
              >
                (dashboard of current incidents the opcen is addressing)
              </div>
            </div>
          </Link>
          <Link className='bigIcon'>
            <div style={{ marginTop: "20%" }}>
              <i className='fa fa-headphones' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p>Dispatch</p>
              <div
                style={{ fontSize: "9px", lineHeight: "10px", color: "#333" }}
              >
                (emergency dispatch operator log-in)
              </div>
            </div>
          </Link>
        </div>
        {/* Another Row */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            height: "150px",
          }}
        >
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-id-badge' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>
                Passes/ID's
              </p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (issue identifaction for access)
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-male' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Volunteers</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (manage you volunteers)
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-bolt' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>
                OP's/Events
              </p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
                className='small-txt-blk'
              >
                (operations or events)
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-book' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Inventory</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
                className='small-txt-blk'
              >
                (download and/or retrieve )
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "10%" }}>
              <i className='fa fa-tachometer' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Reports</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
                className='small-txt-blk'
              >
                (download and/or retrieve )
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard_opcen.propTypes = {
  opcen: PropTypes.object.isRequired,
  opcenprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  opcen: state.opcen,
  opcenprofile: state.opcen_profile,
});

export default connect(mapStateToProps, null)(Dashboard_opcen);
