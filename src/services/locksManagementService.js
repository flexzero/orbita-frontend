import baseUrl from "../utils/baseUrl";
import axios from "axios";
import qs from "querystring";
import { getUnixDateTime, getBarearHeader } from "../utils/utils";

export async function requestLocks(payload) {
  const REQUEST_LOCKS_ENDPOINT = baseUrl("locks", true);
  const { payload: { secretToken: secret_token } } = payload;
  const header = getBarearHeader(secret_token);
  try {
    const requestLocksResponse = await axios.get(REQUEST_LOCKS_ENDPOINT, header);
    console.log("the requst locks response: ", requestLocksResponse);
    return requestLocksResponse.data;
  } catch (error) {
    throw (error);
  }
}

export async function requestPasscodes(payload) {
  const REQUEST_PASSCODES_ENDPOINT = baseUrl("passcodes", true);
  const { payload: { secretToken: secret_token } } = payload;
  const header = getBarearHeader(secret_token);

  try {

    const requestPasscodesResponse = await axios.get(
      REQUEST_PASSCODES_ENDPOINT,
      header
    );
    return requestPasscodesResponse.data;
  } catch (error) {
    throw (error);
  }
}

export async function addPasscode(payload) {
  const ADD_PASSCODE_ENDPOINT = baseUrl("addpasscode", true);

  const {
    payload: {
      lockId,
      passcodeName,
      passcode,
      startDate,
      endDate,
      secretToken: secret_token,
    }
  } = payload;

  const header = getBarearHeader(secret_token);

  const postParams = { lockId, passcodeName, passcode, startDate, endDate };

  try {
    const requestResponse = await axios.post(
      ADD_PASSCODE_ENDPOINT,
      qs.stringify(postParams),
      header
    );
    return requestResponse.data;
  } catch (error) {
    throw (error);
  }
}

export async function deletePasscode(payload) {
  const DELETE_PASSCODE_ENDPOINT = baseUrl("deletepasscode", true);
  const { payload: { lockId, passcodeId: keyboardPwdId, secretToken: secret_token } } = payload;
  const header = getBarearHeader(secret_token);

  const postParams = qs.stringify({
    lockId,
    keyboardPwdId,
  });

  try {
    const response = await axios.post(DELETE_PASSCODE_ENDPOINT, postParams, header);
    return response.data;
  } catch (error) {
    throw (error);
  }
}

export async function editPasscode(payload) {
  const EDIT_PASSCODE_ENDPOINT = baseUrl("editpasscode", true);
  const { payload: { lockId, keyboardPwdId, passcodeName: keyboardPwdName, passcode: keyboardPwd, selectedStartDate: startDate, selectedEndDate: endDate, secretToken:secret_token } } = payload;
  const header = getBarearHeader(secret_token);
  const postParams = qs.stringify({
    lockId,
    keyboardPwdId,
    keyboardPwdName,
    keyboardPwd,
    startDate: getUnixDateTime(startDate),
    endDate: getUnixDateTime(endDate),
  });

  try {
    const response = await axios.post(EDIT_PASSCODE_ENDPOINT, postParams, header);
    return response.data;
  } catch (error) {
    throw (error);
  }

}

export async function getUnlockRecords(payload) {
  const GET_UNLOCK_RECORDS_ENDPOINT = baseUrl("getunlockrecords", true);
  const { payload: { lockId, secretToken: secret_token } } = payload;
  const header = getBarearHeader(secret_token);

  const postParams = qs.stringify({ lockId });
  try {
    const response = await axios.post(GET_UNLOCK_RECORDS_ENDPOINT, postParams, header);
    console.log("response from: ", response);
    return response;
  } catch (error) {
    throw (error);
  }
}
