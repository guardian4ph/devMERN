import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { forgot_password } from "../../actions/auth";

const Otp = ({ sms }) => {
  return <Fragment>test</Fragment>;
};

Otp.propTypes = {
  forgot_password: PropTypes.func.isRequired,
  isUser: PropTypes.bool,
};

const mapStateToProps = state => ({
  isUser: state.auth.isUser,
});
export default connect(mapStateToProps, { forgot_password })(Otp);
