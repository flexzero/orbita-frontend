import { put, call, all } from "redux-saga/effects";
import { addPasscode } from "../services/locksManagementService";
import * as types from "../actions";
import { nanoid } from "nanoid";
import { delay } from "../utils/utils";

export function* addPasscodeSaga(payload) {
  try {
    const { payload: { history, lockId } } = payload;
    const response = yield call(addPasscode, payload);
    const id = nanoid(5);
    response.notification = { id, message: "passcode has been added successfully", severity: "success" };
    yield put({ type: types.ADD_PASSCODE_SUCCESS, response });
    history.push(`/lock/${lockId}`);
  } catch (error) {
    console.log("error in add passcode saga: ", error);
    yield put({ type: types.ADD_PASSCODE_ERROR, error });
  }
}
