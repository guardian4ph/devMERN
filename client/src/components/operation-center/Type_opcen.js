import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { setCreateOpCen } from "../../actions/opcen";
import { connect } from "react-redux";

const Type_opcen = ({ setCreateOpCen, createOpcen, isAuthenticated }) => {
  if (!isAuthenticated && createOpcen) {
    return <Redirect to='/login' />;
  }
  return (
    <Fragment>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "block",
            borderRadius: "10px",

            padding: "20px",
          }}
        >
          <h1 className='large text-primary'>Create your Operation Center</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Choose your type of organization.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <div className='bigIcon'>
            <div
              style={{ marginTop: "30%" }}
              onClick={c => setCreateOpCen("Gov")}
            >
              <i className='fas fa-landmark' aria-hidden='true'></i>
              <p> Government</p>
              <small className='small-txt-blk'>
                (Agencies, Province, City)
              </small>
            </div>
          </div>
          <div className='bigIcon'>
            <div
              style={{ marginTop: "30%" }}
              onClick={c => setCreateOpCen("Vol")}
            >
              <i className='fa fa-hand-paper-o' aria-hidden='true'></i>
              <p> Volunteer Org.</p>
              <small className='small-txt-blk'>(Rotary,JCI, )</small>
            </div>
          </div>
          <div className='bigIcon'>
            <div
              style={{ marginTop: "30%" }}
              onClick={c => setCreateOpCen("Pri")}
            >
              <i className='fa fa-building-o' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p> Private</p>
              <small className='small-txt-blk'>
                (Construction, Utilities etc. )
              </small>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Type_opcen.propTypes = {
  setCreateOpCen: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  createOpcen: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  createOpcen: state.opcen.createOpcen,
});

export default connect(mapStateToProps, { setCreateOpCen })(Type_opcen);
