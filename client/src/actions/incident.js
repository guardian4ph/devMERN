import axios from "axios";
import {
  CREATE_INCIDENT,
  ERROR_CREATE_INCIDENT,
  INCIDENT_SUMMIT_SUCCESS,
  INCIDENT_SUMMIT_FAIL,
  // GET_INCIDENT_BY_ID,
  // GET_INCIDENT_BY_ID_FAIL,
  GET_INCIDENTS,
  GET_INCIDENTS_FAIL,
  CLEAR_INCIDENT,
  GET_INCIDENT_BY_OPCEN,
  GET_INCIDENT_BY_OPCEN_FAIL,
  GET_INCIDENT_BY_USER,
  GET_INCIDENT_BY_USER_FAIL,

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

export const clearIncident = () => dispatch => {
  try {
    dispatch({
      type: CLEAR_INCIDENT,
    });
  } catch (err) {
    dispatch({
      type: ERROR_CREATE_INCIDENT,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const submitIncident =
  ({ user, type, scompleteaddress, scity, sstate, sarea, slat, slng }) =>
  async dispatch => {
    const body = JSON.stringify({
      user,
      type,
      scompleteaddress,
      scity,
      sstate,
      sarea,
      slat,
      slng,
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("api/incident", body, config);
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

//Get incidents all by user

export const getIncidentByUser = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/operation_center/myopcen/${user_id}`);
    dispatch({
      type: GET_INCIDENT_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_INCIDENT_BY_USER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get incidents all by incident ID

export const getIncidentById = incident_id => async dispatch => {
  try {
    const res = await axios.get(`/api/operation_center/myopcen/${incident_id}`);
    dispatch({
      type: GET_INCIDENT_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_INCIDENT_BY_USER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get incident by opcen
export const getIncidentByOpcen = opcen_id => async dispatch => {
  try {
    const res = await axios.get(`/api/operation_center/myopcen/${opcen_id}`);
    dispatch({
      type: GET_INCIDENT_BY_OPCEN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_INCIDENT_BY_OPCEN_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// get incident by incident ID
export const getIncident = () => async dispatch => {
  try {
    const res = await axios.get(`/api/operation_center/myopcen`);
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
