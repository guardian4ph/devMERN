import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Fragment } from "react";
import Spinner from "./Spinner";

const Navbar = ({ auth: { isAuthenticated, isOpcenAdmin, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <div className='emergencybtn' onClick=''>
      <img src='/icons/incident/Button.png' alt='' />
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
