import { put, call, all } from "redux-saga/effects";
import { addPasscode } from "../services/locksManagementService";
import { getErrorMessage } from "../utils/utils";
import * as types from "../actions";

import { nanoid } from "nanoid";

export function* addPasscodeSaga(payload) {
  const { payload: { history, lockId } } = payload;
  try {
    const response = yield call(addPasscode, payload);
    const id = nanoid(5);

    response.notification = { id, message: "passcode has been added successfully", severity: "success" };
    yield put({ type: types.ADD_PASSCODE_SUCCESS, response });
    history.push(`/lock/${lockId}`);
  } catch (error) {
    let errMsg = "";
    const { response: { data: serverError } } = error;
    serverError ? errMsg = serverError : errMsg = error;
    const id = nanoid(5);
    const response = {};
    response.notification = { id: id, message: errMsg, severity: "error" }
    yield put({ type: types.ADD_PASSCODE_ERROR, response });
    history.push(`/lock/${lockId}`);
  }
}
