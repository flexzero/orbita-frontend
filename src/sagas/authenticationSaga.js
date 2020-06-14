import { put, call } from "redux-saga/effects";
import { loginUserService } from "../services/authenticationService";
import { nanoid } from "nanoid";

import * as types from "../actions";

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    yield put({ type: types.LOGIN_USER_SUCCESS, response });
  } catch (error) {
    let errMsg = "";
        const { response: { data: serverError } } = error;
        serverError ? errMsg = serverError : errMsg = error;
        const id = nanoid(5);
        const response = {};
        response.notification = { id: id, message: errMsg, severity: "error" }
        yield put({ type: types.LOGIN_USER_ERROR, response });
  }
}

