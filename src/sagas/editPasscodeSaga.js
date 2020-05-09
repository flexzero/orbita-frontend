import { put, call, all } from "redux-saga/effects";
import { editPasscode } from "../services/locksManagementService";
import * as types from "../actions";
import { nanoid } from "nanoid";
import { delay } from "../utils/utils";

export function* editPasscodeSaga(payload) {
    try {
        const response = yield call(editPasscode, payload);
        const { data } = response;
        const id = nanoid(5);
        response.notification = {id, message: "passcode has been changed successfully", severity: "success"};
        yield put({ type: types.EDIT_PASSCODE_SUCCESS, response });
    } catch (error) { }
}
