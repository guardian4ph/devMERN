import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { forgot_password } from "../../actions/auth";

const ForgotPassword = ({ forgot_password, isUser }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    forgot_password(email);
  };

  if (isUser) {
    return <Redirect to='/otp' />;
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
          <h1 className='large text-primary'>Forgot Password</h1>
          <p className='lead'>
            <i className='fa fa-envelope-o'></i> Enter your email address, for
            verification.
          </p>
          <form className='form' onSubmit={c => onSubmit(c)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='juandelacruz@guardian.ph'
                name='email'
                value={email}
                onChange={c => onChange(c)}
              />
            </div>

            <input type='submit' className='btn btn-primary' value='Send OTP' />
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  forgot_password: PropTypes.func.isRequired,
  isUser: PropTypes.bool,
};

const mapStateToProps = state => ({
  isUser: state.auth.isUser,
});
export default connect(mapStateToProps, { forgot_password })(ForgotPassword);
