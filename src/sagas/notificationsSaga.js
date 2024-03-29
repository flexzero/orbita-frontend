import { put, call } from "redux-saga/effects";
import { deletePasscode } from "../services/locksManagementService";
import * as types from "../actions";

export function* notificationsSaga(response) {
  console.log("response in add notification saga: ", response);
  const {
    response: { notification: payload },
  } = response;
  yield put({ type: types.ADD_NOTIFICATION, payload });
}
