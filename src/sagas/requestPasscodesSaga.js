import { put, call } from "redux-saga/effects";
import { requestPasscodes as getPasscodes } from "../services/locksManagementService";
import { nanoid } from "nanoid";
import * as types from "../actions";

export function* requestPasscodesSaga(payload) {
  try {
    const response = yield call(getPasscodes, payload);
    yield put({ type: types.REQUEST_PASSCODES_SUCCESS, response });
  } catch (error) {
    let errMsg = "";
    const { response: { data: serverError } } = error;
    serverError ? errMsg = serverError : errMsg = error;
    const id = nanoid(5);
    const response = {};
    response.notification = { id: id, message: errMsg, severity: "error" }
    yield put({ type: types.REQUEST_PASSCODES_ERROR, response });
  }
}
