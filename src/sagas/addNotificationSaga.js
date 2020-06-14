import { put, call } from "redux-saga/effects";
import { deletePasscode } from "../services/locksManagementService";
import * as types from "../actions";
import { delay } from "../utils/utils";

export function* addNotificationSaga(response) {
  const { payload: { id }} = response;
  yield call(delay, 6000);
  yield put({type: types.REMOVE_NOTIFICATION, payload: {id}});
}
