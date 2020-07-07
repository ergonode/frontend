/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_USER: 'SET_USER',
    SET_JWT_TOKEN: 'SET_JWT_TOKEN',
    SET_LOGGED_STATE: 'SET_LOGGED_STATE',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_USER](state, user) {
        state.user = user;
    },
    [types.SET_JWT_TOKEN](state, token) {
        state.jwt = token;
    },
    [types.SET_LOGGED_STATE](state, isLogged) {
        state.isLogged = isLogged;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
