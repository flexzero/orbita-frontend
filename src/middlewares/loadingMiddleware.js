import * as types from "../actions";

const DEFAULT_KEY = "loading";

const middleware = (key = DEFAULT_KEY) => (store) => (next) => (action) => {
  const state = store.getState()[key];

  if (state) {
    next(action);

    const startActions = state.startActions || {};
    const startActionTypes = Object.keys(startActions);

    const stopActions = state.stopActions || {};
    const stopActionTypes = Object.keys(stopActions);

    if (startActionTypes.includes(action.type)) {
      const id = startActions[action.type];


      return next({
        type: types.START_LOADING,
        payload: id,
      });

    }

    if (stopActionTypes.includes(action.type)) {
      const id = stopActions[action.type];

      return next({
        type: types.STOP_LOADING,
        payload: id,
      });
    }

    return;
  }

  return next(action);
};

export default middleware;
