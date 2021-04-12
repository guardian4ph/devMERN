import {
  CREATE_OPCEN,
  //   DELETE_OPCEN,
  //   UPDATE_OPCEN,
  //   ADD_ADMIN,
  //   DELETE_ADMIN,
} from "./types";

export const setCreateOpCen = opcenType => dispatch => {
  dispatch({
    type: CREATE_OPCEN,
    payload: { opcenType },
  });
};
