import React, { Fragment, useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
//Connect the component to redux
//See Export down end file
import { connect } from "react-redux";
//Bring actions in the action folders
import { setAlert } from "../../actions/alert";
import { changepassword } from "../../actions/sms";
import { forgot_password } from "../../actions/auth";
import PropTypes from "prop-types";

const ChangePassword = ({
  auth,
  setAlert,
  forgot_password,
  changepassword,
  isAuthenticated,
}) => {
  //formdata is the state, setFormData is the function use to update the state
  //Use state hooks
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  let email = auth.email;

  useEffect(() => {
    forgot_password(email);
  }, [email]);
  //destructure so you would do formData.name formData.number
  //Object Syntax use {}
  const { password, password2 } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();

    if (password !== password2) {
      setAlert("Passwords dont match", "danger");
    } else {
      //register is the action from reducers
      changepassword(
        auth._id,
        auth.name,
        auth.lname,
        auth.number,
        auth.email,
        password
      );
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/Login' />;
  }
  return (
    <Fragment>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          margin: "1rem",
        }}
      >
        <h1 className='large text-primary'>Forgot Password</h1>
        <p className='lead'>
          <i className='fa fa-key'></i> Please enter a new password should be 8
          characters in length.
        </p>
        <form className='form' onSubmit={c => onSubmit(c)}>
          {/* <div style={{ display: "none" }}>
            <input
              type='text'
              placeholder='First Name'
              name='name'
              //value is set value on state for onChange
              value={name}
              onChange={c => onChange(c)}
              required
            />
          </div>
          <div style={{ display: "none" }}>
            <input
              type='text'
              placeholder='Last Name'
              name='lname'
              //value is set value on state for onChange
              value={lname}
              onChange={c => onChange(c)}
              required
            />
          </div>
          <div style={{ display: "none" }}>
            <input
              type='tel'
              placeholder='09XX XXX XXXX'
              name='number'
              value={number}
              onChange={c => onChange(c)}
              required
            />
          </div>
          <div style={{ display: "none" }}>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={c => onChange(c)}
            />
            <small className='form-text'></small>
          </div> */}
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
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              value={password2}
              onChange={c => onChange(c)}
              name='password2'
              minLength='8'
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Change Password'
          />
        </form>
      </div>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changepassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

//Connect get two props the
// 1. state that  you want to map.. e.g get state from other actions
// 2. object you want to use from actions and its props
export default connect(mapStateToProps, {
  forgot_password,
  setAlert,
  changepassword,
})(withRouter(ChangePassword));
