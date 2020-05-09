import baseUrl from "../utils/baseUrl";
import axios from "axios";
import qs from "querystring";
import { getUnixDateTime } from "../utils/utils";

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
    console.log("the data: ", requestResponse.data);
    return requestResponse.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePasscode(payload) {
  const DELETE_PASSCODE_ENDPOINT = baseUrl("deletepasscode", true);
  const { lockId, passcodeId: keyboardPwdId } = payload.payload;

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

export async function editPasscode(payload) {
  const EDIT_PASSCODE_ENDPOINT = baseUrl("editpasscode", true);
  const { lockId, keyboardPwdId, passcodeName: keyboardPwdName, passcode: keyboardPwd, selectedStartDate: startDate, selectedEndDate: endDate } = payload.payload;
  const postParams = qs.stringify({
    lockId,
    keyboardPwdId,
    keyboardPwdName,
    keyboardPwd,
    startDate: getUnixDateTime(startDate),
    endDate: getUnixDateTime(endDate)
  });

  try {
    const response = await axios.post(EDIT_PASSCODE_ENDPOINT, postParams);
    return response.data;
  } catch (error) {
    console.log(error);
  }

}

export async function getUnlockRecords(payload) {
  const GET_UNLOCK_RECORDS_ENDPOINT = baseUrl("getunlockrecords", true);
  const { lockId } = payload.payload;
  const postParams = qs.stringify({lockId});
  try {
    const response = await axios.post(GET_UNLOCK_RECORDS_ENDPOINT, postParams);
    return response;
  } catch (error) {
    console.log(error);
  }
}
