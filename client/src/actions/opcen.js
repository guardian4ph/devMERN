import axios from "axios";
import {
  CREATE_OPCEN,
  ERROR_CREATE_OPCEN,
  OPCEN_REGISTER_SUCCESS,
  OPCEN_REGISTER_FAIL,
  GET_OPCEN,
  GET_OPCEN_FAIL,
  GET_OPCENS,
  GET_OPCENS_FAIL,
  //   DELETE_OPCEN,
  //   UPDATE_OPCEN,
  //   ADD_ADMIN,
  //   DELETE_ADMIN,
} from "./types";
import { setAlert } from "./alert";

export const setCreateOpCen = opcenType => dispatch => {
  try {
    dispatch({
      type: CREATE_OPCEN,
      payload: opcenType,
    });
  } catch (err) {
    dispatch({
      type: ERROR_CREATE_OPCEN,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const registerOpcen = ({
  user,
  name,
  category,
  description,
  type,
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ user, name, category, description, type });
  try {
    const res = await axios.post("api/operation_center", body, config);
    dispatch({
      type: OPCEN_REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: OPCEN_REGISTER_FAIL,
    });
  }
};

//Get post

export const getOpcens = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/operation_center/myopcen/${user_id}`);
    dispatch({
      type: GET_OPCENS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_OPCENS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOpcen = (user, _id) => async dispatch => {
  console.log("opcen hit");
  try {
    const res = await axios.get(`/api/operation_center/myopcen/${user}/${_id}`);
    dispatch({
      type: GET_OPCEN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_OPCEN_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
