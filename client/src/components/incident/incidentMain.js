import React from "react";
import PropTypes from "prop-types";
import Comms from "../socket/Communication";

const incidentMain = props => {
  return (
    <div>
      <Comms />
    </div>
  );
};

incidentMain.propTypes = {};

export default incidentMain;
