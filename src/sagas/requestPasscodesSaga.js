import { put, call } from "redux-saga/effects";
import { requestPasscodes as getPasscodes } from "../services/locksManagementService";
import * as types from "../actions";

export function* requestPasscodesSaga() {
    try {
      const response = yield call(getPasscodes);
      yield put({ type: types.REQUEST_PASSCODES_SUCCESS, response });
    } catch (error) {
      yield put({ type: types.REQUEST_PASSCODES_ERROR, error });
    }
  }
  