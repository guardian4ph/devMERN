import axios from "axios";
import { v4 as uuid } from "uuid";
import { SEND_OTP, SEND_OTP_FAIL, REMOVE_OTP } from "./types";
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
  // console.log("actions", number);
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
