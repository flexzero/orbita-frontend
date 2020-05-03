import baseUrl from "../utils/baseUrl";
import axios from "axios";
import qs from "querystring";

export async function loginUserService(request) {
  const LOGIN_ENDPOINT = baseUrl("login");

  const { username, password } = request.user;

  var parameters = {
    username,
    password,
  };

  try {
    const loginResponse = await axios.post(
      LOGIN_ENDPOINT,
      qs.stringify(parameters)
    );
    return loginResponse.data;
  } catch (err) {
    return err;
  }
}
