/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getParsedConditionSetData,
} from '@Conditions/models/conditionSetMapper';
import {
    objectToArrayWithPropsName,
} from '@Core/models/objectWrapper';

import {
    types,
} from './mutations';

export default {
    getConditions({
        commit, rootState,
    }, params = {}) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/dictionary/conditions`, {
            params,
        }).then((data) => {
            commit(types.SET_CONDITIONS_DICTIONARY, objectToArrayWithPropsName(data));
        });
    },
    async getConditionSet(
        {
            state, commit, dispatch, rootState,
        },
        {
            conditionSetId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        await this.app.$axios.$get(`${userLanguageCode}/conditionsets/${conditionSetId}`).then(async ({
            id,
            conditions = [],
        }) => {
            await Promise.all(conditions.map(async (condition) => {
                const {
                    type,
                } = condition;
                if (!state.conditions[type]) {
                    await dispatch('getConditionConfiguration', {
                        conditionId: type,
                    });
                }
            }));

            const {
                conditionsData, conditionsTree,
            } = getParsedConditionSetData(conditions, state.conditions);

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'conditionsValues',
                value: conditionsData,
            });
            dispatch('gridDesigner/setGridData', conditionsTree, {
                root: true,
            });
            dispatch('gridDesigner/setFullGridData', conditionsTree, {
                root: true,
            });
        });
    },
    createConditionSet(
        {
            commit, rootState,
        },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/conditionsets`, data).then(({
            id,
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    updateConditionSet(
        {
            rootState,
        },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/conditionsets/${id}`, data)
            .then(() => onSuccess(id))
            .catch(e => onError(e.data));
    },
    async getConditionConfiguration(
        {
            commit, rootState,
        },
        {
            conditionId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        await this.app.$axios.$get(`${userLanguageCode}/conditions/${conditionId}`).then((data) => {
            commit(types.SET_CONDITIONS, {
                key: conditionId,
                value: data,
            });
        });
    },
    setConditionValue({
        commit, state,
    },
    {
        conditionId, parameterName, parameterValue,
    }) {
        if (!state.conditionsValues[conditionId]) {
            commit(types.ADD_CONDITION_VALUE, {
                conditionId,
                parameterName,
                parameterValue,
            });
        } else {
            commit(types.SET_CONDITION_VALUE, {
                conditionId,
                parameterName,
                parameterValue,
            });
        }
    },
    removeConditionValue({
        commit, state,
    }, conditionId) {
        if (state.conditionsValues[conditionId]) {
            commit(types.REMOVE_CONDITION_VALUE_FROM_SET, conditionId);
        }
    },
};
