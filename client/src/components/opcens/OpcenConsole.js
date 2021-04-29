import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dashboard from "../operation-center/Dashboard_opcen";
import Spinner from "../layout/Spinner";
import { getOpcen } from "../../actions/opcen";

export const OpcenConsole = ({ opcenmain: { opcen, loading } }) => {
  return (
    <Fragment>
      {loading || opcen === null ? (
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
            <img
              style={{
                height: "88px",
                width: "88px",
                padding: "8px",
              }}
              src='/img/mandaue.png.png'
              alt=''
            />
          </div>
          <div>
            <h2> {opcen.name}</h2>
            <p> Category: {opcen.category}</p>
          </div>
        </div>
      )}
      <Dashboard />
    </Fragment>
  );
};

OpcenConsole.propTypes = {
  opcen: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  opcen: state.opcen.opcen,
  opcenmain: state.opcen,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OpcenConsole);
