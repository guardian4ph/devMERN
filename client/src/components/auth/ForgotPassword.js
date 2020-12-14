import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { forgot_password } from "../../actions/auth";

const Login = ({ forgot_password }) => {
  const [formData, setFormData] = useState({
    number: "",
    user: "",
  });

  const { number } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();

    forgot_password(number);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Forgot Password</h1>
      <p className='lead'>
        <i className='fa fa-mobile'></i> Enter mobile number
      </p>
      <form className='form' onSubmit={c => onSubmit(c)}>
        <div className='form-group'>
          <input
            type='tel'
            placeholder='09XX XXX XXXX'
            name='number'
            value={number}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>
            Please input a valid Philippine mobile number as format set.
          </small>
        </div>

        <input type='submit' className='btn btn-primary' value='Send' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  forgot_password: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(null, { forgot_password })(Login);
