import { put, call } from "redux-saga/effects";
import { deletePasscode } from "../services/locksManagementService";
import * as types from "../actions";

export function* deletePasscodeSaga(payload) {
    try {
        const response = yield call(deletePasscode, payload);
        yield put({type: types.DELETE_PASSCODE_SUCCESS, response} );
    } catch (error) {
        yield put({ type: types.DELETE_PASSCODE_ERROR, error});
    }
}