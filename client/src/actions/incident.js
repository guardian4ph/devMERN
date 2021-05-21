import axios from "axios";
import {
  CREATE_INCIDENT,
  ERROR_CREATE_INCIDENT,
  INCIDENT_SUMMIT_SUCCESS,
  INCIDENT_SUMMIT_FAIL,
  GET_INCIDENT,
  GET_INCIDENT_FAIL,
  GET_INCIDENTS,
  GET_INCIDENTS_FAIL,
  //   DELETE_OPCEN,
  //   UPDATE_OPCEN,
  //   ADD_ADMIN,
  //   DELETE_ADMIN,
} from "./types";
import { setAlert } from "./alert";

export const setCreateIncident = incidentType => dispatch => {
  try {
    dispatch({
      type: CREATE_INCIDENT,
      payload: incidentType,
    });
  } catch (err) {
    dispatch({
      type: ERROR_CREATE_INCIDENT,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const submitIncident =
  ({ user, name, category, description, type }) =>
  async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ user, name, category, description, type });
    try {
      const res = await axios.post("api/operation_center", body, config);
      dispatch({
        type: INCIDENT_SUMMIT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: INCIDENT_SUMMIT_FAIL,
      });
    }
  };

//Get post

export const getIncidents = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/operation_center/myopcen/${user_id}`);
    dispatch({
      type: GET_INCIDENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_INCIDENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getIncident = (user, _id) => async dispatch => {
  try {
    const res = await axios.get(`/api/operation_center/myopcen/${user}/${_id}`);
    dispatch({
      type: GET_INCIDENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_INCIDENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
