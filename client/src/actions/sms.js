import axios from "axios";
import { SEND_OTP, SEND_OTP_FAIL } from "./types";
import { setAlert } from "./alert";

export const sendOtp = ({ number, msg }) => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SMS_ENDPOINT + "/api/send_sms",
      {
        text: msg,
        param: [{ number: number }],
      }
    );
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
