/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
    languages: [],
    selectedLanguageCodes: [],
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
