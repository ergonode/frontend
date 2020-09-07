/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedConditionSetData,
    getParsedConditionSetData,
} from '@Conditions/models/conditionSetMapper';
import {
    createSet,
    getConfiguration,
    getDictionary,
    getSets,
    updateSet,
} from '@Conditions/services/index';
import {
    objectToArrayWithPropsName,
} from '@Core/models/objectWrapper';

import {
    types,
} from './mutations';

export default {
    async getConditions({
        commit,
    }, params = {}) {
        const dictionary = await getDictionary({
            $axios: this.app.$axios,
            params,
        });

        commit(types.SET_CONDITIONS_DICTIONARY, objectToArrayWithPropsName(dictionary));
    },
    async getConditionConfiguration(
        {
            commit,
        },
        {
            id,
        },
    ) {
        const configuration = await getConfiguration({
            $axios: this.app.$axios,
            id,
        });

        commit(types.SET_CONDITIONS, {
            key: id,
            value: configuration,
        });
    },
    async getConditionSet(
        {
            state,
            commit,
            dispatch,
        },
        {
            id,
        },
    ) {
        const {
            conditions = [],
        } = await getSets({
            $axios: this.app.$axios,
            id,
        });

        await Promise.all(conditions.map(async (condition) => {
            const {
                type,
            } = condition;
            if (!state.conditions[type]) {
                await dispatch('getConditionConfiguration', {
                    id: type,
                });
            }
        }));

        const {
            conditionsData,
            conditionsTree,
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
    },
    async createConditionSet(
        {
            state,
            commit,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                conditions,
                conditionsValues,
            } = state;

            const data = {
                conditions: getMappedConditionSetData(conditionsValues, conditions),
            };

            const {
                id,
            } = await createSet({
                $axios: this.app.$axios,
                data,
            });

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }
    },
    async updateConditionSet(
        {},
        {
            id,
            data,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            await updateSet({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }
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
