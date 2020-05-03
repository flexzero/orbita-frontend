import baseUrl from "../utils/baseUrl";
import axios from "axios";
import qs from "querystring";

export async function initServerService(request) {
  const INIT_SERVER_ENDPOINT = baseUrl("init", true);
  const { secretToken } = request.auth;

  const parameters = {
    secret_token: secretToken,
  };


  try {
    const initServerResponse = await axios.post(
      INIT_SERVER_ENDPOINT,
      qs.stringify(parameters),
      {headers: { 'Authorization' : `Beared ${secretToken}`}}
    );
    return initServerResponse.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
