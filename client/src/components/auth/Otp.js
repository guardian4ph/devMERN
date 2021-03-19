import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendOtp } from "../../actions/sms";

const Otp = ({ sendOtp, auth }) => {
  const number = auth.number;
  const msg = " Proceed with your Change Password for GUARDIAN Account";
  const otp = Math.floor(Math.random() * (1400 - 6000 + 1) + 6000);

  // console.log("On page Load", number, msg, otp);

  useEffect(() => {
    sendOtp(number, msg);
  }, [sendOtp]);

  const [formData, setFormData] = useState({
    number: "",
    msg: "",
  });

  // const { number, msg } = formData;
  const { number1, msg1 } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    sendOtp(number, msg);
    console.log("data", number, msg);
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
                value={auth.number}
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

            <input type='submit' className='btn btn-primary' value='Send OTP' />
          </form>
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
  auth: state.auth,
});
export default connect(mapStateToProps, { sendOtp })(Otp);
