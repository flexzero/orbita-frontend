import * as types from "../actions";

const INITIAL_STATE = {
  deletingPasscodeId: null,
  editingPasscodeId: null,
};

function omitValue(obj, prop) {
  let { [prop]: omit, ...res} = obj;
  return res;
}
export default function (state = {}, action) {
  const response = action.response;

  switch (action.type) {
    case types.REQUEST_PASSCODES_SUCCESS:
      return { ...state, ...response };
    case types.REQUEST_PASSCODES_ERROR:
      return { ...state, ...response };
    case types.ADD_PASSCODE_SUCCESS:
      return { ...state, allIds: [...state.allIds, response.keyboardPwdId] };
    case types.DELETE_PASSCODE:
      return { ...state, deletingPasscodeId: action.payload.passcodeId };
    case types.EDIT_PASSCODE:
      return { ...state, editingPasscodeId: action.payload.passcodeId };
    case types.EDIT_PASSCODE_SUCCESS:
      const { data: { keyboardPwdId } } = response;
      return { ...state, byId: { ...state.byId, [keyboardPwdId]: response.data } }
    case types.DELETE_PASSCODE_SUCCESS:
      const { deletedPasscodeId } = response;
      const { byId } = state;
      console.log("byId: ", byId);
      return {
        ...state,
        allIds: [
          ...state.allIds.slice(0, state.allIds.indexOf(deletedPasscodeId)),
          ...state.allIds.slice(state.allIds.indexOf(deletedPasscodeId) + 1),
        ],
        byId: omitValue(state.byId, deletedPasscodeId),
        deletingPasscodeId: null
      };
    case types.DELETE_PASSCODE_ERROR:
      return { ...state, deletingPasscodeId: null };
    default:
      return state;
  }
}
