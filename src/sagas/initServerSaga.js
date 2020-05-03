import { put, call } from "redux-saga/effects";
import { initServerService } from "../services/initServerService";
import * as types from "../actions";

export function* initServerSaga(payload) {
    try {
      const response = yield call(initServerService, payload);
      yield put({ type: types.INIT_SERVER_SUCCESS, response });
    } catch (error) {
      yield put({ type: types.INIT_SERVER_ERROR, error });
    }
  }
  