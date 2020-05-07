import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { ADD_PASSCODE } from "../actions";
import qs from "querystring";

export async function requestLocks() {
  const REQUEST_LOCKS_ENDPOINT = baseUrl("locks", true);

  try {
    const requestLocksResponse = await axios.get(REQUEST_LOCKS_ENDPOINT);
    return requestLocksResponse.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function requestPasscodes() {
  const REQUEST_PASSCODES_ENDPOINT = baseUrl("passcodes", true);

  try {
    
    const requestPasscodesResponse = await axios.get(
      REQUEST_PASSCODES_ENDPOINT
    );
    return requestPasscodesResponse.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function addPasscode(payload) {
  const ADD_PASSCODE_ENDPOINT = baseUrl("addpasscode", true);

  const {
    lockId,
    passcodeName,
    passcode,
    startDate,
    endDate,
  } = payload.payload;

  const postParams = { lockId, passcodeName, passcode, startDate, endDate };

  try {
    const requestResponse = await axios.post(
      ADD_PASSCODE_ENDPOINT,
      qs.stringify(postParams)
    );
    return requestResponse.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePasscode(payload) {
  const DELETE_PASSCODE_ENDPOINT = baseUrl("deletepasscode", true);
  const { lockId, passcodeId:keyboardPwdId } = payload.payload;

  const postParams = qs.stringify({
    lockId,
    keyboardPwdId,
  });

  try {
    const response = await axios.post(DELETE_PASSCODE_ENDPOINT, postParams);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
