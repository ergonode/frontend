/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import types from './mutation-types';

export default {
    [types.SET_ID](state, id) {
        state.id = id;
    },
    [types.SET_CODE](state, code) {
        state.code = code;
    },
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    [types.CLEAR_STATE](state) {
        state.id = null;
        state.code = '';
        state.name = '';
    },
};
