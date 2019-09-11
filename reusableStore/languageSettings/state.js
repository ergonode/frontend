/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import actions from './actions';
import mutations from './mutations';

const state = () => ({
    languages: [],
    selectedLanguageCodes: [],
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
