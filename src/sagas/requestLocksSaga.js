import { put, call } from "redux-saga/effects";
import { requestLocks } from "../services/locksManagementService";
import { nanoid } from "nanoid";
import * as types from "../actions";

export function* requestLocksSaga(payload) {
  
  try {
    const response = yield call(requestLocks, payload);
    yield put({ type: types.REQUEST_LOCKS_SUCCESS, response });
  } catch (error) {
    let errMsg = "";
        const { response: { data: serverError } } = error;
        serverError ? errMsg = serverError : errMsg = error;
        const id = nanoid(5);
        const response = {};
        response.notification = { id: id, message: errMsg, severity: "error" }
        yield put({ type: types.REQUEST_LOCKS_ERROR, response });
  }
}
