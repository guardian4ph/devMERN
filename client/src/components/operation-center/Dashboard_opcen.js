import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registerOpcen } from "../../actions/opcen";
import PropTypes from "prop-types";

const Dashboard_opcen = props => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });

  //destructure so you would do formData.name formData.number
  //Object Syntax use {}
  const { name, category, description } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    registerOpcen({ name, category, description });
  };
  //   if (isAuthenticated) {
  //     return <Redirect to={`/operation-center/${user}`} />;
  //   }

  return (
    <Fragment>
      <div
        style={{
          padding: "25px",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "block",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <div style={{ fontSize: "12px", lineHeight: "10px", color: "#333" }}>
            Command and control your resources using this panel.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Link className='smallIcon'>
            <div style={{ marginTop: "22%" }}>
              <i className='fa fa-building' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Profile</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (update your opcen profile)
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "22%" }}>
              <i className='fa fa-users' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Responders</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (manage you responders)
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "22%" }}>
              <i className='fa fa-cogs' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Teams</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (monitor your teams)
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "22%" }}>
              <i className='fa fa-ambulance' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Vehicles</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (manage your mobile assets)
              </div>
            </div>
          </Link>
          <Link className='smallIcon'>
            <div style={{ marginTop: "22%" }}>
              <i className='fa fa-h-square' aria-hidden='true'></i>
              <p style={{ fontSize: "12px", lineHeight: "10px" }}>Facilities</p>
              <div
                style={{ fontSize: "8px", lineHeight: "10px", color: "#333" }}
              >
                (locations that the opcen is operating or monitoring)
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
                (dashboard of current incidents the opcen is addressing)
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
          }}
        >
          <Link className='smallIcon'>
            <div style={{ marginTop: "22%" }}>
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
            <div style={{ marginTop: "22%" }}>
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
            <div style={{ marginTop: "22%" }}>
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
            <div style={{ marginTop: "22%" }}>
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
            <div style={{ marginTop: "22%" }}>
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
};

const mapStateToProps = state => ({
  opcen: state.opcen,
});

export default connect(mapStateToProps, null)(Dashboard_opcen);
