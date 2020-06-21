/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
