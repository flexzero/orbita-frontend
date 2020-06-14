import * as types from ".";

export const requestLocks = (payload) => {
    return {
        type: types.REQUEST_LOCKS,
        payload,
    }
}

export const requestPasscodes = (payload) => {
    return {
        type: types.REQUEST_PASSCODES,
        payload,
    }
}

export const editPasscode = (payload) => {
    return {
        type: types.EDIT_PASSCODE,
        payload,
    }
}

export const deletePasscode = (payload) => {
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

export const getUnlockRecords = (payload) => {
    return {
        type: types.GET_RECORDS,
        payload
    }
}

