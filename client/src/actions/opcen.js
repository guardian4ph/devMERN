import axios from "axios";
import {
  CREATE_OPCEN,
  ERROR_CREATE_OPCEN,
  OPCEN_REGISTER_SUCCESS,
  OPCEN_REGISTER_FAIL,
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
      payload: { opcenType },
    });
  } catch (err) {
    dispatch({
      type: ERROR_CREATE_OPCEN,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const registerOpcen = ({
  _id,
  name,
  category,
  number,
  description,
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ _id, name, category, number, description });
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
