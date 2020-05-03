import * as types from ".";

export const requestLocks = () => {
    return {
        type: types.REQUEST_LOCKS
    }
}

export const requestPasscodes = () => {
    return {
        type: types.REQUEST_PASSCODES,
    }
}

export const editPasscode = (id) => {
    return {
        type: types.EDIT_PASSCODE,
        id,
    }
}

export const deletePasscode = (payload) => {
    console.log("Action deletePasscode payload: ", payload);
    return {
        type: types.DELETE_PASSCODE,
        payload,
    }
}

export const addPasscode = (payload) => {
    return {
        type: types.ADD_PASSCODE,
        payload
    }
}