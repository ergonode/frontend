/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

const onDefaultError = () => {};

export default {
    getConditionById(
        { commit, rootState },
        { conditionId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/conditon/${conditionId}`).then((data) => {
            commit(types.SET_CONDITIONS, { key: conditionId, value: data });
        }).catch(onDefaultError);
    },
    setConditionValues(
        { commit },
        { condition, values },
    ) {
        commit(types.SET_CONDITIONS_VALUES, { condition, values });
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
