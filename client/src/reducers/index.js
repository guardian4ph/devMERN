import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import map from "./map";
import sms from "./sms";
import opcen from "./opcen";
import opcen_profile from "./opcen_profile";
import incident from "./incident";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  map,
  sms,
  opcen,
  opcen_profile,
  incident,
});
