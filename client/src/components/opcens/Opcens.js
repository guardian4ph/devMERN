import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getOpcens } from "../../actions/opcen";
import { loadUser } from "../../actions/auth";
import OpcenItem from "./OpcenItem";

const Opcens = ({ getOpcens, user, opcen: { opcens, loading } }) => {
  useEffect(() => {
    // loadUser();
    getOpcens(user);
  }, [getOpcens]);
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
          }}
        >
          <h1 className='large text-primary'> Operation Center</h1>
          <button className='btn btn-primary'> Create OpCen</button>
        </div>
        <div style={{ marginTop: "1%" }}>
          <p>Command your team and control your resources.</p>
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
  loadUser: PropTypes.func.isRequired,
  opcen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  opcen: state.opcen,
  user: state.auth.user._id,
});

export default connect(mapStateToProps, { getOpcens, loadUser })(Opcens);
