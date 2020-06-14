import { put, call } from "redux-saga/effects";
import { getReservations } from "../services/reservationService";
import { nanoid } from "nanoid";
import * as types from "../actions";

export function* getReservationsSaga(payload) {
    try {
        const response = yield call(getReservations, payload);
        const { reservations } = response;
        yield put({ type: types.GET_RESERVATIONS_SUCCESS, response: reservations });
    } catch (error) {
        console.log(error); 
        let errMsg = "";
        const { response: { data: serverError } } = error || {};
        serverError ? errMsg = serverError : errMsg = error;
        const id = nanoid(5);
        const response = {};
        response.notification = { id: id, message: errMsg, severity: "error" }
        yield put({ type: types.GET_RESERVATIONS_ERROR, response });
    }
}