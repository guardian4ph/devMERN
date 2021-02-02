import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
//Connect the component to redux
//See Export down end file
import { connect } from "react-redux";
//Bring actions in the action folders
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  //formdata is the state, setFormData is the function use to update the state
  //Use state hooks
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    number: "",
    email: "",
    password: "",
    password2: "",
  });
  //destructure so you would do formData.name formData.number
  //Object Syntax use {}
  const { name, lname, number, email, password, password2 } = formData;

  const onChange = async c =>
    setFormData({ ...formData, [c.target.name]: c.target.value });

  const onSubmit = async c => {
    c.preventDefault();
    if (password !== password2) {
      setAlert("Passwords dont match", "danger");
    } else {
      //register is the action from reducers
      register({ name, lname, number, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={c => onSubmit(c)}>
        <div className='form-group'>
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
        <div className='form-group'>
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
        <div className='form-group'>
          <input
            type='tel'
            placeholder='09XX XXX XXXX'
            name='number'
            value={number}
            onChange={c => onChange(c)}
            required
          />
          <small className='form-text'>
            This site uses your mobile number for authentication, sending alerts
            and other communication.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={c => onChange(c)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

//Connect get two props the
// 1. state that  you want to map.. e.g get state from other actions
// 2. object you want to use from actions and its props
export default connect(mapStateToProps, { setAlert, register })(Register);
