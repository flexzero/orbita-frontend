import * as types from ".";

export const initiateServer = (auth) => {
    return {
        type: types.INIT_SERVER,
        auth
    }
}