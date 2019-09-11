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
    setConditionValue({ commit, state },
        { conditionId, parameterName, parameterValue }) {
        if (!state.conditionsValues[conditionId]) {
            commit(types.ADD_CONDITION_VALUE, { conditionId, parameterName, parameterValue });
        }
        commit(types.SET_CONDITION_VALUE, { conditionId, parameterName, parameterValue });
    },
    removeCondition({ commit, state }, conditionId) {
        if (state.conditionsValues[conditionId]) {
            commit(types.REMOVE_CONDITION_FROM_SET, conditionId);
        }
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
