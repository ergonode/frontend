/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedCondition,
    getMappedTree,
    getParsedConditions,
} from '@Conditions/models/conditionSetMapper';
import {
    createSet,
    get,
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
    }, {
        group,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const dictionary = await getDictionary({
                $axios: this.app.$axios,
                params: {
                    group,
                },
            });

            onSuccess(objectToArrayWithPropsName(dictionary));
        } catch (e) {
            if (this.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getCondition(
        {
            state,
            commit,
        },
        {
            id,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const configuration = await get({
                $axios: this.app.$axios,
                id,
            });

            const conditionsValues = {};

            state.tree.forEach((node) => {
                if (state.conditionsValues[node.id]
                    && !Object.keys(state.conditionsValues[node.id]).length
                    && node.type === id) {
                    conditionsValues[node.id] = getMappedCondition({
                        parameters: configuration.parameters,
                        node,
                    });
                }
            });

            commit(types.SET_CONDITIONS_VALUES, conditionsValues);
            commit(types.SET_CONDITIONS, {
                key: id,
                value: configuration,
            });

            onSuccess(id);
        } catch (e) {
            if (this.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getConditionSet(
        {
            commit,
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

        const {
            tree,
            values,
        } = getMappedTree(conditions);

        commit('__SET_STATE', {
            key: 'id',
            value: id,
        });
        commit('__SET_STATE', {
            key: 'conditionsValues',
            value: values,
        });
        commit('__SET_STATE', {
            key: 'tree',
            value: tree,
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
                tree,
            } = state;
            let data = {
                conditions: getParsedConditions({
                    values: conditionsValues,
                    conditions,
                    tree,
                }),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Conditions/store/condition/action/createConditionSet/__before', {
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
            await this.$extendMethods('@Conditions/store/condition/action/createConditionSet/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            console.log(e);
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
                tree,
                conditionsValues,
            } = state;
            let data = {
                conditions: getParsedConditions({
                    values: conditionsValues,
                    conditions,
                    tree,
                }),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Conditions/store/condition/action/updateConditionSet/__before', {
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
            await this.$extendMethods('@Conditions/store/condition/action/updateConditionSet/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            console.log(e);
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    setConditionValue({
        commit,
        state,
    },
    {
        conditionId,
        parameterName,
        parameterValue,
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
        commit,
        state,
    }, conditionId) {
        if (state.conditionsValues[conditionId]) {
            commit(types.REMOVE_CONDITION_VALUE_FROM_SET, conditionId);
        }
    },
};
