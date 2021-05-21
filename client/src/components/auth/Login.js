import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const Login = ({
  login,
  isAuthenticated,
  isOpcenAdmin,
  createOpcen,
  setAlert,
}) => {
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

  if (isAuthenticated && createOpcen) {
    return <Redirect to='/create-operation-center' />;
  }

  if (isAuthenticated && isOpcenAdmin) {
    return <Redirect to='/operation-center' />;
  } else if (isAuthenticated && !isOpcenAdmin) {
    return <Redirect to='/posts' />;
  }
  // if (isAuthenticated && !isOpcenAdmin) {
  //   return <Redirect to='/posts' />;
  // }

  return (
    <Fragment>
      <div
        style={{
          margin: "auto",
          position: "fixed",
          top: "25%",
          width: "640px",
        }}
      >
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
            {createOpcen ? (
              <p className='alert alert-danger '>
                Log-in or create an account first{" "}
              </p>
            ) : null}

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
                  autoComplete='username email'
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={c => onChange(c)}
                  // autocomplete='off'
                  autoComplete='current-password'
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isOpcenAdmin: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  createOpcen: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isOpcenAdmin: state.auth.isOpcenAdmin,
  createOpcen: state.opcen.createOpcen,
  auth: state.auth,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
