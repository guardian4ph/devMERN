import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const NotificationForm = props => {
  return <div>Notification details Upload Photo/Video</div>;
};

NotificationForm.propTypes = {
  props: PropTypes,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationForm);
