import axios from "axios";
import { SEND_OTP, SEND_OTP_FAIL } from "./types";
import { setAlert } from "./alert";

export const sendOtp = (number, msg) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ number, msg });
  // console.log("actions", number);
  try {
    const res = await axios.post("/api/sms/sendOtp", body, config);
    dispatch({
      type: SEND_OTP,
      payload: res.data,
    });
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
