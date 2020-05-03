import * as types from '../actions';

export default function(state = {}, action) {
   
    const response = action.response;

    switch(action.type) {
        case types.REQUEST_LOCKS_SUCCESS:
            return {...state, ...response};
        case types.REQUEST_LOCKS_ERROR:
            return {...state, ...response};
        default:
            return state;
    }
};