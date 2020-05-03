import { put, call } from "redux-saga/effects";
import { requestLocks } from "../services/locksManagementService";
import * as types from "../actions";

export function* requestLocksSaga() {
    try {
      const response = yield call(requestLocks);
      yield put({ type: types.REQUEST_LOCKS_SUCCESS, response });
    } catch (error) {
      yield put({ type: types.REQUEST_LOCKS_ERROR, error });
    }
  }
  