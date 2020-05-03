import * as types from "../actions";

export default function(state={}, action) {
    const response = action.response;

    
    switch(action.type) {
        case types.INIT_SERVER_SUCCESS:
            return {...state, ...response};
        case types.INIT_SERVER_ERROR:
            return {...state, ...response};
        default:
            return state;
    }
}