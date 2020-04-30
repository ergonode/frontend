/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setSelectTree({ commit }, option) {
        commit(types.SET_SELECT_TREE, option);
    },
    setOption({ commit }, option) {
        commit(types.SET_OPTION, option);
    },
    setOptions({ commit }, option) {
        commit(types.SET_OPTIONS, option);
    },
};
