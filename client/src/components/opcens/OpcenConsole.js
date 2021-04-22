import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dashboard from "../operation-center/Dashboard_opcen";

export const OpcenConsole = ({
  opcen: { _id, user, name, category, discription, type },
}) => {
  return (
    <Fragment>
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
          <h2> {name}</h2>
          <p> Category: {category}</p>
        </div>
      </div>
      <Dashboard />
    </Fragment>
  );
};

OpcenConsole.propTypes = {
  opcen: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  opcen: state.opcen.opcen,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OpcenConsole);
