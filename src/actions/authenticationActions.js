import * as types from "./";

export const loginUserAction = (user) => {
  return {
    type: types.LOGIN_USER,
    user,
  };
};

export const logoutAction = (user) => {
  return {
    type: types.LOGOUT_USER,
    user,
  };
};
