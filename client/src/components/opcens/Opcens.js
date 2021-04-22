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
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          height: "88vh",
        }}
      >
        <h1 className='large text-primary'> Operation Center</h1>

        <div style={{ marginTop: "10%" }}>
          <p>Command your team and control your resources.</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              justifyContent: "space-around",
            }}
          >
            {opcens.map(opcen => (
              <div className='posts'>
                <OpcenItem key={opcen._id} opcen={opcen} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <button className='btn btn-primary'> Create Operation Center</button>
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
