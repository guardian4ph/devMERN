import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dashboard from "../operation-center/Dashboard_opcen";
import Spinner from "../layout/Spinner";
import { getOpcenProfileById } from "../../actions/opcenprofile";
import { getOpcens } from "../../actions/opcen";
import { withRouter } from "react-router";

const OpcenConsole = ({
  user,
  getOpcenProfileById,
  opcen_id,
  opcen,
  opcen_profile: { profile, loading },
}) => {
  useEffect(() => {
    getOpcens(user);
    getOpcenProfileById(opcen_id);
  }, [getOpcenProfileById]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            background: "#fff",
            borderRadius: "10px",
            marginBottom: "5px",
            height: "100px",
          }}
        >
          <div>
            {profile === null ? (
              <img
                style={{
                  height: "88px",
                  width: "88px",
                  padding: "8px",
                  marginLeft: "5%",
                }}
                src={`/opcenlogo/guardian.png`}
                alt=''
              />
            ) : (
              <img
                style={{
                  height: "88px",
                  width: "88px",
                  padding: "8px",
                  marginLeft: "5%",
                }}
                src={`/opcenlogo/${profile.logo}`}
                alt=''
              />
            )}
          </div>
          <div>
            <h2 className='large text-primary'> {opcen.name}</h2>
            <small className='small-txt-blk'> {opcen.category}</small>
          </div>
          <div style={{ alignItems: "center", margin: "auto" }}>
            put stats here
          </div>
        </div>
      )}
      <Dashboard />
    </Fragment>
  );
};

OpcenConsole.propTypes = {
  getOpcenProfileById: PropTypes.func.isRequired,
  opcen: PropTypes.object.isRequired,
  opcen_id: PropTypes.object.isRequired,
  opcen_profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  opcen: state.opcen.opcen,
  opcen_id: state.opcen.opcen._id,
  opcen_profile: state.opcen_profile,
  user: state.auth._id,
});

export default connect(mapStateToProps, { getOpcenProfileById })(
  withRouter(OpcenConsole)
);
