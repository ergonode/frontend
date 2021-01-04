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
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                conditions,
                conditionsValues,
            } = state;
            let data = {
                conditions: getMappedConditionSetData(conditionsValues, conditions),
            };
            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Conditions/store/condition/action/createConditionSet/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });
            // EXTENDED BEFORE METHOD

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

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Conditions/store/condition/action/createConditionSet/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateConditionSet(
        {
            state,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                conditions,
                conditionsValues,
            } = state;
            let data = {
                conditions: getMappedConditionSetData(conditionsValues, conditions),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Conditions/store/condition/action/updateConditionSet/__before', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

            await updateSet({
                $axios: this.app.$axios,
                id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Conditions/store/condition/action/updateConditionSet/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
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
