import { takeLatest } from "redux-saga/effects";
import { loginSaga } from "./authenticationSaga";
import { initServerSaga } from "./initServerSaga";
import { requestLocksSaga } from "./requestLocksSaga";
import { requestPasscodesSaga } from "./requestPasscodesSaga";
import { addPasscodeSaga } from "./addPasscodeSaga";
import { deletePasscodeSaga } from "./deletePasscodeSaga";

import * as types from "../actions";

export default function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.INIT_SERVER, initServerSaga);
  yield takeLatest(types.REQUEST_LOCKS, requestLocksSaga);
  yield takeLatest(types.REQUEST_PASSCODES, requestPasscodesSaga);
  yield takeLatest(types.ADD_PASSCODE, addPasscodeSaga);
  yield takeLatest(types.DELETE_PASSCODE, deletePasscodeSaga);
}
