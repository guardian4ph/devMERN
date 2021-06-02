import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getOpcens } from "../../actions/opcen";
import OpcenItem from "./OpcenItem";

import {
  getOpcenProfile,
  getOpcenProfileById,
} from "../../actions/opcenprofile";

const Opcens = ({ getOpcens, user, opcen: { opcen, opcens, loading } }) => {
  useEffect(() => {
    getOpcens(user);
  }, [getOpcens, user]);
  return loading || opcens === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{
          padding: "10px",
          background: "#fff",
          borderRadius: "10px",
          height: "88vh",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: " 2fr 1fr",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <h1 className='large text-primary'> Operation Center</h1>
          <button>sub opcen</button>
        </div>
        <div>
          <small className='small-txt-blk'>
            Command your team and control your resources.
          </small>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              maxheight: "68vh",

              justifyContent: "space-around",
              flexWrap: "wrap",
              overflowY: "auto",
            }}
          >
            {opcens.map(opcen => (
              <div className='posts'>
                <OpcenItem key={opcen._id} opcen={opcen} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Opcens.propTypes = {
  getOpcens: PropTypes.func.isRequired,
  getOpcenProfile: PropTypes.func.isRequired,
  opcen: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  opcen: state.opcen,
  user: state.auth.user._id,
});

export default connect(mapStateToProps, {
  getOpcens,
  getOpcenProfile,
  getOpcenProfileById,
})(Opcens);
