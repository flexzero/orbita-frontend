import * as types from '../actions';

export default function (state = {}, action) {

    const response = action.response;

    switch (action.type) {
        case types.LOGIN_USER_SUCCESS:
        case types.ADD_LOGIN:
            return { ...state, ...response };
        case types.LOGOUT_USER:
            const newState = state;
            delete state.username
            delete state.secret_token
            return newState;
        case types.LOGIN_USER_ERROR:
            return { ...state, ...response };
        default:
            return state;
    }
};