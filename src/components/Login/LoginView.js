import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Redirect } from "react-router-dom";
import Login from "./Login";

import { loginUserAction } from "../../actions/authenticationActions";

export default function LoginView() {

  const isLoggedIn = useSelector(state => state.login);

  const {secret_token:secretToken} = isLoggedIn;


  const dispatch = useDispatch();

  function onHandleLogin(event, authData) {
    event.preventDefault();
    
    const {username, password} = authData;

    const data = {
      username,
      password,
    };

    dispatch(loginUserAction(data));
  }

  if (secretToken) {
    return <Redirect to="/" />;
  }

  return (
    <Login handleLogin={onHandleLogin} />
  );
}
