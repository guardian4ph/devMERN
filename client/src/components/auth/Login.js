import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    login(email, password);
  };

  //Redirect if Logged in

  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your Account
      </p>
      <form className='form' onSubmit={c => onSubmit(c)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={c => onChange(c)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={c => onChange(c)}
            minLength='8'
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Log-in' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <p className='my-1'>
        Forgot passsword? <Link to='/forgot_pass'>Forgot</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
