import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  SEND_OTP,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User check if there is a token for user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Register User

export const register = ({
  name,
  lname,
  number,
  email,
  password,
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, lname, number, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};

//  Check if User Exist via email

export const forgot_password = email => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });
  try {
    const res = await axios.post("/api/auth/forgot", body, config);
    dispatch({
      type: RESET_PASSWORD,
      payload: res.data,
    });

    // dispatch(send_otp());
    // dispatch(
    //   setAlert("One time pin (OTP) send to your mobile number.", "success")
    // );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//  SEND OTP

export const send_otp = number => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookie: "devckie=db59-b300-9176-0043",
    },
  };
  const text = Math.floor(Math.random() * 899999 + 100000);
  const body = JSON.stringify({
    text: `Testing lng po ${text}`,
    param: [{ number: "09173146624" }],
  });
  try {
    const res = await axios.post(
      "https://192.168.1.2/api/send_sms",
      body,
      config
    );
    dispatch({
      type: SEND_OTP,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
