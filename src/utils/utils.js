import { useEffect, useRef } from "react";
import equal from "fast-deep-equal";


export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function determinePasscodeType(type) {
  switch (type) {
    case 1:
      return "One-time";
    case 2:
      return "Permanent";
    case 3:
      return "Period";
    case 4:
      return "Delete";
    case 5:
      return "Weekend Cyclic";
    case 6:
      return "Daily Cyclic";
    case 7:
      return "Wordday Cyclic";
    case 8:
      return "Monday Cyclic";
    case 9:
      return "Tuesday Cyclic";
    case 10:
      return "Wednesday Cyclic";
    case 11:
      return "Thursday Cyclic";
    case 12:
      return "Friday Cyclic";
    case 13:
      return "Saturday Cyclic";
    case 14:
      return "Sunday Cyclic";
    default:
      return "unknown";
  }
}

export function epochToDate(epoch) {
  return new Date(epoch).toUTCString();
}


export function generateRandomPasscode() {
  return Math.floor(Math.random() * 100000000);
}

function deepCompareEquals(a, b) {
  return equal(a, b);
}

function useDeepCompareMeoize(value) {
  const ref = useRef();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(callback, dependencies) {
  useEffect(callback, useDeepCompareMeoize(dependencies));
}

export function getUnixDateTime(date) {
  return (new Date(date).getTime());
}


export function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
}

export function getErrorMessage(errroCode) {
  switch (errroCode) {
    case 0: return "none error message";
    case 1: return "failed";
    case -3: return "Invalid Parameter.";
    case 10000: return "invalid client_id	client_id";
    case 10001: return "invalid client";
    case 1000: return "invalid code";
    case 10003: return "invalid token";
    case 10004: return "invalid grant	token";
    case 10005: return "invalid grant_scope	token";
    case 10006: return "invalid username";
    case 10007: return "invalid account";
    case 10008: return "invalid redirect_uri";
    case 10009: return "unsupported response_type";
    case 10010: return "unsupported grant_type";
    case 10011: return "invalid refresh_token";
    case 20000: return "invalid openid";
    case 20001: return "not lock user";
    case 20002: return "not lock admin";
    case 20003: return "invalid key";
    case 20004: return "not exists key";
    case 20005: return "backupkey password error";
    case 20006: return "not exists receiver";
    case 20007: return "invalid keyboardPwdVersion";
    case 20008: return "invalid lockname";
    case 30001: return "Do not have permission";
    case 30002: return "invalid registered username";
    case 30003: return "existing registered users";
    case 30004: return "invalid userid to delete";
    case 30005: return "not the user of custom app";
    case 30006: return "exceeds the restrictions of API call number";
    case 80000: return "date must be current time";
    case 80002: return "invalid json format	JSON";
    case 90000: return "internal server error";
    case -2012: return "The Lock is not connected to any Gateway";
    case -2018: return "Permission Denied.";
    default: return "Unknown Error";
  }
}

export function getPasscodeStatus(code) {
  switch (code) {
    default:
      return "Unknown Status";
  }
}

export function getUnlockRecordType(type) {
  const types = [
    "App unlock",
    "touch the parking lock",
    "gateway unlock",
    "passcode unlock",
    "parking lock raise",
    "parking lock lower",
    "IC card unlock",
    "fingerprint unlock",
    "wristband unlock",
    "mechanical key unlock",
    "Bluetooth lock",
    "gateway unlock",
    "unexpected unlock",
    "door magnet close",
    "door magnet open",
    "open from inside",
    "lock by fingerprint",
    "lock by passcode",
    "lock by IC card",
    "lock by Mechanical key",
    "Remote Control",
    "Tamper alert",
    "Auto Lock",
    "unlock by unlock key",
    "lock by lock key",
    "Use INVALID Passcode several times"
  ];

  if (type > 48) {
    return "unknown unlock type";
  } else {
    return types[type - 1]
  }
}

export function getBarearHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}