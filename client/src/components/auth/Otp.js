import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendOtp } from "../../actions/sms";

const Otp = ({ sendOtp, isUser }) => {
  const [formData, setFormData] = useState({
    number: "",
    msg: "",
  });

  const { number, msg } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    sendOtp(number, msg);
  };

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
          <h1 className='large text-primary'>Sign In</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Sign into your Account
          </p>
          <form className='form' onSubmit={c => onSubmit(c)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='09173146624'
                name='number'
                value={number}
                onChange={c => onChange(c)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Text here'
                name='msg'
                value={msg}
                onChange={c => onChange(c)}
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
        </div>
      </div>
    </Fragment>
  );
};

Otp.propTypes = {
  sendOtp: PropTypes.func.isRequired,
  isUser: PropTypes.bool,
};

const mapStateToProps = state => ({
  isUser: state.auth.isUser,
});
export default connect(mapStateToProps, { sendOtp })(Otp);
