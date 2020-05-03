import { combineReducers } from "redux";
import login from "./loginReducer";
import register from "./registerReducer";
import initServer from "./initServer";
import locks from "./locksReducer";
import passcodes from "./passcodeReducers";
import loading from "./loadingReducers";
import notifications from "./notifications";

const createRootReducer = () =>
  combineReducers({
    login,
    register,
    initServer,
    locks,
    passcodes,
    loading,
    notifications,
  });
export default createRootReducer;
