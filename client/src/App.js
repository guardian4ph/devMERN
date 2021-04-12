import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";
import ForgotPassword from "./components/auth/ForgotPassword";
import PostImage from "./components/post/PostImage";
import ID from "./components/id/Id";
import QrPhoto from "./components/id/QrPhoto";
import Otp from "./components/auth/Otp";
import ChangePassword from "./components/auth/ChangePassword";
import TypeOpCen from "./components/operation-center/Type_opcen";
import OperationCenter from "./components/operation-center/create_opcen";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/forgot_pass' component={ForgotPassword} />
              <Route exact path='/otp' component={Otp} />
              <Route exact path='/changepassword' component={ChangePassword} />

              <Route exact path='/typeopcen' component={TypeOpCen} />

              <Route exact path='/profile/:id' component={Profile} />

              <PrivateRoute
                exact
                path='/create-operation-center'
                component={OperationCenter}
              />

              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute exact path='/ID' component={ID} />
              <PrivateRoute exact path='/QR' component={QrPhoto} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />

              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              <PrivateRoute
                exact
                path='/posts/:id/:articleImage'
                component={PostImage}
              />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
