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