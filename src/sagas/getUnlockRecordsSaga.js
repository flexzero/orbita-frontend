import { put, call } from "redux-saga/effects";
import { getUnlockRecords } from "../services/locksManagementService";
import * as types from "../actions";

export function* getUnlockRecordsSaga(payload) {
    try {
        const response = yield call(getUnlockRecords, payload);
        const { data: { data } } = response;
        yield put({ type: types.GET_RECORDS_SUCCESS, response: data });
    } catch (error) {
        yield put({ type: types.GET_RECORDS_ERROR });
    }
}