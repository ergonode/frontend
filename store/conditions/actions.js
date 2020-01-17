/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { objectToArrayWithPropsName } from '~/model/objectWrapper';
import { getParsedConditionSetData } from '~/model/mappers/conditionSetMapper';

export default {
    setId({ commit }, value) {
        commit(types.SET_CONDITION_SET_ID, value);
    },
    getConditions({ commit, rootState }, params = {}) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/dictionary/conditions`, { params }).then((data) => {
            commit(types.SET_CONDITIONS_DICTIONARY, objectToArrayWithPropsName(data));
        });
    },
    async getConditionSetById(
        {
            state, commit, dispatch, rootState,
        },
        { conditionSetId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        await this.app.$axios.$get(`${userLanguageCode}/conditionsets/${conditionSetId}`).then(async ({
            id,
            conditions = [],
        }) => {
            await Promise.all(conditions.map(async (condition) => {
                const { type } = condition;
                if (!state.conditions[type]) {
                    await dispatch('getConditionConfigurationById', { conditionId: type });
                }
            }));

            const {
                conditionsData, conditionsTree,
            } = getParsedConditionSetData(conditions, state.conditions);

            commit(types.SET_CONDITION_SET_ID, id);
            commit(types.SET_CONDITIONS_DATA, conditionsData);
            dispatch('gridDesigner/setGridData', conditionsTree, { root: true });
            dispatch('gridDesigner/setFullGridData', conditionsTree, { root: true });
        });
    },
    createConditionSet(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/conditionsets`, data).then(({ id }) => {
            commit(types.SET_CONDITION_SET_ID, id);
            onSuccess(id);
        }).catch((e) => onError(e.data));
    },
    updateConditionSet(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/conditionsets/${id}`, data).then(() => onSuccess(id)).catch((e) => onError(e.data));
    },
    async getConditionConfigurationById(
        { commit, rootState },
        { conditionId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        await this.app.$axios.$get(`${userLanguageCode}/conditions/${conditionId}`).then((data) => {
            commit(types.SET_CONDITIONS, { key: conditionId, value: data });
        });
    },
    setConditionValue({ commit, state },
        { conditionId, parameterName, parameterValue }) {
        if (!state.conditionsValues[conditionId]) {
            commit(types.ADD_CONDITION_VALUE, { conditionId, parameterName, parameterValue });
        } else {
            commit(types.SET_CONDITION_VALUE, { conditionId, parameterName, parameterValue });
        }
    },
    removeConditionValue({ commit, state }, conditionId) {
        if (state.conditionsValues[conditionId]) {
            commit(types.REMOVE_CONDITION_VALUE_FROM_SET, conditionId);
        }
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
