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
        commit,
    }, params = {}) {
        return this.app.$axios.$get('dictionary/conditions', {
            params,
        }).then((data) => {
            commit(types.SET_CONDITIONS_DICTIONARY, objectToArrayWithPropsName(data));
        });
    },
    async getConditionSet(
        {
            state, commit, dispatch,
        },
        {
            conditionSetId,
        },
    ) {
        await this.app.$axios.$get(`conditionsets/${conditionSetId}`).then(async ({
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
            commit,
        },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        return this.app.$axios.$post('conditionsets', data).then(({
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
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        return this.app.$axios.$put(`conditionsets/${id}`, data)
            .then(() => onSuccess(id))
            .catch(e => onError(e.data));
    },
    async getConditionConfiguration(
        {
            commit,
        },
        {
            conditionId,
        },
    ) {
        await this.app.$axios.$get(`conditions/${conditionId}`).then((data) => {
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
