import { put, call } from "redux-saga/effects";
import { getUnlockRecords } from "../services/locksManagementService";
import { nanoid } from "nanoid";
import * as types from "../actions";

export function* getUnlockRecordsSaga(payload) {
    try {
        const response = yield call(getUnlockRecords, payload);
        const { data: { data } } = response;
        yield put({ type: types.GET_RECORDS_SUCCESS, response: data });
    } catch (error) {
        let errMsg = "";
        const { response: { data: serverError } } = error || {};
        serverError ? errMsg = serverError : errMsg = error;
        const id = nanoid(5);
        const response = {};
        response.notification = { id: id, message: errMsg, severity: "error" }
        yield put({ type: types.GET_RECORDS_ERROR, response });
    }
}