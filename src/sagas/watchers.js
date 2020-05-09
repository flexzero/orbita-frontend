import { takeLatest } from "redux-saga/effects";
import { loginSaga } from "./authenticationSaga";
import { initServerSaga } from "./initServerSaga";
import { requestLocksSaga } from "./requestLocksSaga";
import { requestPasscodesSaga } from "./requestPasscodesSaga";
import { addPasscodeSaga } from "./addPasscodeSaga";
import { deletePasscodeSaga } from "./deletePasscodeSaga";

import * as types from "../actions";
import { notificationsSaga } from "./notificationsSaga";
import { addNotificationSaga } from "./addNotificationSaga";
import { editPasscodeSaga } from "./editPasscodeSaga";
import { getUnlockRecordsSaga } from "./getUnlockRecordsSaga";

export default function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.INIT_SERVER, initServerSaga);
  yield takeLatest(types.REQUEST_LOCKS, requestLocksSaga);
  yield takeLatest(types.REQUEST_PASSCODES, requestPasscodesSaga);
  yield takeLatest(types.ADD_PASSCODE, addPasscodeSaga);
  yield takeLatest(types.DELETE_PASSCODE, deletePasscodeSaga);
  yield takeLatest(types.DELETE_PASSCODE_SUCCESS, notificationsSaga);
  yield takeLatest(types.ADD_PASSCODE_SUCCESS, notificationsSaga);
  yield takeLatest(types.EDIT_PASSCODE_SUCCESS, notificationsSaga);
  yield takeLatest(types.ADD_NOTIFICATION, addNotificationSaga);
  yield takeLatest(types.EDIT_PASSCODE, editPasscodeSaga);
  yield takeLatest(types.GET_RECORDS, getUnlockRecordsSaga);
}
