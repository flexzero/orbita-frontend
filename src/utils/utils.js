import {useEffect, useRef} from "react";
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

  if(!deepCompareEquals(value, ref.current)) {
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