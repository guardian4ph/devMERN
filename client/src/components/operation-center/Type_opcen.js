import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setCreateOpCen } from "../../actions/opcen";
import { connect } from "react-redux";

const Type_opcen = ({ setCreateOpCen }) => {
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
          <Link className='bigIcon'>
            <div
              style={{ marginTop: "35%" }}
              onClick={c => setCreateOpCen("Gov")}
            >
              <i className='fa fa-thumbs-o-up' aria-hidden='true'></i>
              <p> Government</p>
              <small>(Agencies, Province, City, Municipality, Barangays)</small>
            </div>
          </Link>
          <Link className='bigIcon'>
            <div
              style={{ marginTop: "35%" }}
              onClick={c => setCreateOpCen("Vol")}
            >
              <i className='fa fa-thumbs-o-up' aria-hidden='true'></i>
              <p> Volunteer Org.</p>
              <small>(NDCN, REAVO)</small>
            </div>
          </Link>
          <Link className='bigIcon'>
            <div
              style={{ marginTop: "35%" }}
              onClick={c => setCreateOpCen("Pri")}
            >
              <i className='fa fa-thumbs-o-up' aria-hidden='true'></i>
              <i aria-hidden='true'></i>
              <p> Private</p>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Type_opcen.propTypes = {
  setCreateOpCen: PropTypes.func.isRequired,
};

export default connect(null, { setCreateOpCen })(Type_opcen);
