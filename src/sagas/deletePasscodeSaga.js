import { put, call } from "redux-saga/effects";
import { deletePasscode } from "../services/locksManagementService";
import * as types from "../actions";
import { nanoid } from "nanoid";

export function* deletePasscodeSaga(payload) {
    try {
        const response = yield call(deletePasscode, payload);
        const id = nanoid(5);
        response.notification = { id, message: "Passcode has been deleted successfully", severity: "success" };
        yield put({ type: types.DELETE_PASSCODE_SUCCESS, response });
    } catch (error) {
        console.dir(error);
        let errMsg = "";
        const { response: { data: serverError } } = error;
        console.log(serverError);
        serverError ? errMsg = serverError : errMsg = error;
        const id = nanoid(5);
        const response = {};
        response.notification = { id: id, message: `something went wrong while deleting passcode: ${errMsg}`, severity: "error" }
        yield put({ type: types.DELETE_PASSCODE_ERROR, response });
    }
}