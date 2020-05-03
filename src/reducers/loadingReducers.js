import * as types from "../actions";

const loadersData = [
  {
    id: "loginLoading",
    start: [types.LOGIN_USER],
    end: [types.LOGIN_USER_SUCCESS, types.LOGIN_USER_ERROR],
  },
  {
    id: "locksLoading",
    start: [types.REQUEST_LOCKS],
    end: [types.REQUEST_LOCKS_SUCCESS, types.REQUEST_LOCKS_ERROR],
  },
  {
    id: "addPasscodeLoading",
    start: [types.ADD_PASSCODE],
    end: [types.ADD_PASSCODE_ERROR, types.ADD_PASSCODE_SUCCESS]
  },
  {
    id: "deletePasscodeLoading",
    start: [types.DELETE_PASSCODE],
    end: [types.DELETE_PASSCODE_ERROR, types.DELETE_PASSCODE_SUCCESS],
  }
];

const normalizedState = loadersData.map((props, id) => {
  return {
    loaders: { [props.id]: false },
    startActions: props.start.reduce(
      (acc, id) => ({
        ...acc,
        [id]: props.id,
      }),
      {}
    ),
    stopActions: props.end.reduceRight(
      (acc, id) => ({
        ...acc,
        [id]: props.id,
      }),
      {}
    ),
  };
});

const INITIAL_STATE = normalizedState.reduce((acc, val) => {
  return {
    loaders: { ...acc.loaders, ...val.loaders },
    startActions: { ...acc.startActions, ...val.startActions },
    stopActions: { ...acc.stopActions, ...val.stopActions },
  };
});

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.START_LOADING:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload]: true },
      };
    case types.STOP_LOADING:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload]: false },
      };
    default:
      return state;
  }
};

export default loadingReducer;
