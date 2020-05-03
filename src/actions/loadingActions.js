import * as types from ".";

export const startLoading = (id) => ({
  type: types.START_LOADING,
  payload: id,
});

export const startLoading = (id) => ({
  type: types.STOP_LOADING,
  payload: id,
});


