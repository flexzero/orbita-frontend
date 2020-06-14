import { put, call } from "redux-saga/effects";
import { initServerService } from "../services/initServerService";
import { nanoid } from "nanoid";
import { delay } from "../utils/utils";
import * as types from "../actions";

export function* initServerSaga(payload) {
    try {
      const response = yield call(initServerService, payload);
      yield put({ type: types.INIT_SERVER_SUCCESS, response });
    } catch (error) {
      let errMsg = "";
        const { response: { data: serverError } } = error;
        serverError ? errMsg = serverError : errMsg = error;
        const id = nanoid(5);
        const response = {};
        response.notification = { id: id, message: errMsg, severity: "error" }
        yield put({ type: types.INIT_SERVER_ERROR, response });
    }
  }
  