import { put, call } from "redux-saga/effects";
import { deletePasscode } from "../services/locksManagementService";
import * as types from "../actions";
import {nanoid} from "nanoid";

export function* deletePasscodeSaga(payload) {
    try {
        const response = yield call(deletePasscode, payload);
        const id = nanoid(5);
        response.notification = {id, message: "Passcode has been deleted successfully", severity: "success"};
        yield put({type: types.DELETE_PASSCODE_SUCCESS, response} );
    } catch (error) {
        yield put({ type: types.DELETE_PASSCODE_ERROR, error});
    }
}