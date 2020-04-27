/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_CUSTOM_STATE_PROPERTY: 'SET_CUSTOM_STATE_PROPERTY',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_CUSTOM_STATE_PROPERTY](state, { stateProp, value }) {
        state[stateProp] = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
