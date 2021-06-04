import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIncidents } from "../../actions/incident";
import { getOpcenProfileById } from "../../actions/opcenprofile";
import Clock from "react-live-clock";
import Moment from "react-moment";
import Incidents from "./Incidents";
import Spinner from "../layout/Spinner";

const IncidentsMain = ({
  user,
  getOpcenProfileById,
  opcen_id,
  opcen,
  opcen_profile: { profile },
  getIncidents,
  incident: { incidents, loading },
}) => {
  useEffect(() => {
    getIncidents();
    getOpcenProfileById(opcen_id);
  }, []);

  var date = new Date();

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='full'>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            marginBottom: "2px",
            height: "60px",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "60px",
              width: "60px",
              padding: "2px",
              marginLeft: "2%",
            }}
          >
            {profile === null ? (
              <img src={`/opcenlogo/guardian.png`} alt='' />
            ) : (
              <img src={`/opcenlogo/${profile.logo}`} alt='' />
            )}
          </div>
          <div style={{ marginLeft: "15px" }}>
            <h2 className='large text-primary'> {opcen.name}</h2>
            <small className='small-txt-blk'> {opcen.category}</small>
          </div>
          <div style={{ alignItems: "center", margin: "auto" }}>
            put stats here
          </div>
        </div>

        {/* reported incidents */}
        <div
          style={{
            width: "100%",
            height: "38px",
            display: "flex",
            top: "0px",
            // alignContent: "center",
            // alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            padding: "0 30px 0 30px",
          }}
        >
          <h1> CURRENT REPORTED INCIDENTS</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#215a75",
              padding: "2px 10px 2px 10px",
              width: "25%",
              color: "#eee",
            }}
          >
            <h1>
              <Moment format='ll'>{date}</Moment>
            </h1>
            <h1>, </h1>
            <h1>
              <Clock
                format={"h:mm:ssa"}
                ticking={true}
                timezone={"Asia/Manila"}
              />
            </h1>
          </div>
        </div>
        <div style={{ display: "block", width: "100%" }}>
          <Incidents incident={incidents} />
        </div>
      </div>
    </Fragment>
  );
};

IncidentsMain.propTypes = {
  getIncidents: PropTypes.func.isRequired,
  incidents: PropTypes.array.isRequired,
  opcen: PropTypes.object.isRequired,
  opcen_id: PropTypes.object.isRequired,
  opcen_profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  incident: state.incident,

  opcen: state.opcen.opcen,
  opcen_id: state.opcen.opcen._id,
  opcen_profile: state.opcen_profile,
  user: state.auth._id,
});

const mapDispatchToProps = { getIncidents, getOpcenProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(IncidentsMain);
