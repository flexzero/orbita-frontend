import * as types from "../actions";


export default function (state = [], action) {

  switch (action.type) {
    case types.ADD_NOTIFICATION:
  
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
