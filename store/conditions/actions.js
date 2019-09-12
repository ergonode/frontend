/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

const onDefaultError = () => {};

export default {
    setId({ commit }, value) {
        commit(types.SET_CONDITION_SET_ID, value);
    },
    setCode({ commit }, value) {
        commit(types.SET_CONDITION_SET_CODE, value);
    },
    getConditionSetById(
        { commit, dispatch, rootState },
        { conditionSetId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/conditionsets/${conditionSetId}`).then(({
            id,
            code,
            name = '',
            description = '',
        }) => {
            const translations = {
                name,
                description,
            };
            commit(types.SET_CONDITION_SET_ID, id);
            commit(types.SET_CONDITION_SET_CODE, code);
            dispatch('translations/setTabTranslations', { translations }, { root: true });
        }).catch(onDefaultError);
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
        }).catch(e => onError(e.data));
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
        return this.app.$axios.$put(`${userLanguageCode}/conditionsets/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    getConditionById(
        { commit, rootState },
        { conditionId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/conditions/${conditionId}`).then((data) => {
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
    removeConditionSet({ state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/conditionsets/${id}`).then(() => onSuccess()).catch(onDefaultError);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
