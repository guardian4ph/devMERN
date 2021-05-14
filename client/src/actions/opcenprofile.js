import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_OPCEN_PROFILE,
  PROFILE_OPCEN_ERROR,
  // UPDATE_OPCEN_PROFILE,
  CLEAR_OPCEN_PROFILE,
  // ACCOUNT_OPCEN_DELETED,
  GET_OPCEN_PROFILES,
} from "./types";

//Get All user profile
export const getOpcenProfile = () => async dispatch => {
  dispatch({ type: CLEAR_OPCEN_PROFILE });
  try {
    //   change this
    const res = await axios.get("/api/opcen_profile/opcenprofiles");
    dispatch({
      type: GET_OPCEN_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_OPCEN_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Get profile by ID
export const getOpcenProfileById = opcen_id => async dispatch => {
  try {
    const res = await axios.get(`/api/opcen_profile/profile/${opcen_id}`);
    dispatch({
      type: GET_OPCEN_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_OPCEN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update

export const createOpcenProfile =
  (formData, history, edit = false) =>
  async dispatch => {
    console.log("create opcen profile");
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/opcen_profile", formData, config);

      dispatch({
        type: GET_OPCEN_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/operation-center");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_OPCEN_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// //Add Facilities

// export const addExperience = (formData, history) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const res = await axios.put("/api/profile/experience", formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert("Trainings added", "success"));

//     history.push("./dashboard");
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// //Add Responder

// export const addEducation = (formData, history) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const res = await axios.put("/api/profile/education", formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert("Education Added", "success"));

//     history.push("./dashboard");
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Delete Experience

// export const deleteExperience = id => async dispatch => {
//   try {
//     const res = await axios.delete(`api/profile/experience/${id}`);
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert("Experience Deleted", "success"));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Delete Education

// export const deleteEducation = id => async dispatch => {
//   try {
//     const res = await axios.delete(`api/profile/education/${id}`);
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert("Education Deleted", "success"));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// //Delete account and profile

// export const deleteAccount = () => async dispatch => {
//   if (window.confirm("Are you sure? This can NOT be undone!")) {
//     try {
//       await axios.delete("api/profile");
//       dispatch({
//         type: CLEAR_PROFILE,
//       });
//       dispatch({
//         type: ACCOUNT_DELETED,
//       });

//       dispatch(setAlert("Your account has been permanently DELETED"));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   }
// };

// //Add Experience

// export const addEmergencyInfo = (formData, history) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const res = await axios.put("/api/profile/emergencyinfo", formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert("Emergency information added", "success"));

//     history.push("./dashboard");
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
