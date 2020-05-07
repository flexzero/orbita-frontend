import * as types from "../actions";

const INITIAL_STATE = [
  {
    id: 0,
    severity: "success",
    message: "this is message 1 of id 0",
  },
  {
    id: 1,
    severity: "error",
    message: "this is message of id 1",
  },
  {
    id: 2,
    severity: "warning",
    message: "this is warning message",
  },
];

export default function (state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case types.ADD_NOTIFICATION:
      console.log("ADD_NOTIFICATION Action: ", action.payload);
      return [...state, action.payload];
    case types.REMOVE_NOTIFICATION:
      let newState = [...state];
      newState.splice(
        state.findIndex((val) => val.id === action.payload.id),
        1
      );
      return newState;
    default:
        return state;
  }
}
