import axios from "axios";

//checker function if there is a token in  local storage
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.default.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
