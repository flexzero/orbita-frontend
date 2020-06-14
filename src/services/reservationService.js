import baseUrl from "../utils/baseUrl";
import axios from "axios";
import qs from "querystring";
import { getUnixDateTime, getBarearHeader } from "../utils/utils";

export async function getReservations(payload) {
  const REQUEST_RESERVATION_ENDPOINT = baseUrl("rooms", true);
  const { payload: { secretToken: secret_token } } = payload;
  const header = getBarearHeader(secret_token);
  try {
    const response = await axios.get(REQUEST_RESERVATION_ENDPOINT, header);
    return response.data;
  } catch (error) {
    throw (error);
  }
}