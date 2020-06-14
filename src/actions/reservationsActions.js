import * as types from ".";

export const getReservations = (payload) => {
    return {
        type: types.GET_RESERVATIONS,
        payload
    }
}