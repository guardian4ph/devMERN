import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  SEND_OTP,
  SEND_OTP_FAIL,
  REMOVE_OTP,
  OTP_MATCH,
  OTP_NOT_MATCH,
  CHANGE_PASSWORD_FAIL,
  PASSWORD_CHANGED,
} from "./types";
import { setAlert } from "./alert";

export const sendOtp = (
  user,
  number,
  name,
  msg,
  otp,
  timeout = 300000
) => async dispatch => {
  const id = uuid();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ user, number, name, msg, otp });

  try {
    const res = await axios.post("/api/sms/sendOtp", body, config);
    dispatch({
      type: SEND_OTP,
      payload: { user, name, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_OTP, payload: id }), timeout);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: SEND_OTP_FAIL,
    });
  }
};

export const otpMatch = (number, sent_otp) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ number, sent_otp });

  try {
    const res = await axios.post("/api/sms/onMatch", body, config);
    dispatch({
      type: OTP_MATCH,
      payload: { number },
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: OTP_NOT_MATCH,
    });
  }
};

// update user

export const changepassword = (
  id,
  name,
  lname,
  number,
  email,
  password
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ id, name, lname, number, email, password });

  try {
    const res = await axios.post("/api/sms/changepassword", body, config);
    dispatch({
      type: PASSWORD_CHANGED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: CHANGE_PASSWORD_FAIL,
    });
  }
};
