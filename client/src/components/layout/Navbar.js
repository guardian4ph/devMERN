import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Fragment } from "react";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to={`/operation-center`}>
          <i className='fa fa-building-o' aria-hidden='true'></i>{" "}
          <span className='hide-sm'>Operation Center </span>
        </Link>
      </li>
      <li>
        <Link to='/ID'>
          <i className='fa fa-id-badge' aria-hidden='true'></i>{" "}
          <span className='hide-sm'>ID </span>
        </Link>
      </li>
      <li>
        <Link to='/profiles'>
          <i className='fa fa-ambulance'></i>{" "}
          <span className='hide-sm'>Responders</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fa fa-envelope-o'></i>{" "}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{" "}
          <span className='hide-sm'>Profile </span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Responders</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <Logo />
      {/* <h4>
        <Link to='/'>
          <i className='fas fa-code' /> GUARDIAN Command and Control
        </Link>
      </h4> */}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  // user: state.auth.user._id,
});

export default connect(mapStateToProps, { logout })(Navbar);
