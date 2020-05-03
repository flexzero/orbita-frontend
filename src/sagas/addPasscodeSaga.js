import { put, call, all } from "redux-saga/effects";
import { addPasscode } from "../services/locksManagementService";
import * as types from "../actions";
import { nanoid } from "nanoid";
import { delay } from "../utils/utils";

export function* addPasscodeSaga(payload) {
  try {
    const response = yield call(addPasscode, payload);
    put({ type: types.ADD_PASSCODE_SUCCESS, response });
  } catch (error) {
    console.log(error);
    yield put({ type: types.ADD_PASSCODE_ERROR, error });
  }
}
