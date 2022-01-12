/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    objectToArrayWithPropsName,
} from '@Core/models/objectWrapper';
import {
    getMappedInitialConditionsValues,
    getMappedInitialTypeConditionsValues,
    getMappedTree,
    getParsedConditions,
} from '@Workflow/models/conditionDesigner/conditionSetMapper';
import {
    getFromAndToTransition,
} from '@Workflow/models/workflowDesigner';
import {
    getCondition,
    getDictionary,
    updateTransitionConditions,
} from '@Workflow/services/index';

import {
    types,
} from './mutations';

export default {
    async getConditions({
        commit,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const dictionary = await getDictionary({
                $axios: this.app.$axios,
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
            type,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const configuration = await getCondition({
                $axios: this.app.$axios,
                type,
            });

            commit(types.SET_CONDITIONS_VALUES, getMappedInitialTypeConditionsValues({
                tree: state.tree,
                type,
                parameters: configuration.parameters,
                values: state.conditionsValues,
            }));
            commit(types.SET_CONDITIONS, {
                key: type,
                value: configuration,
            });

            onSuccess(type);
        } catch (e) {
            if (this.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async setConditions(
        {
            commit,
        },
        {
            conditions,
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const tree = getMappedTree({
                conditions,
            });
            const conditionsValues = getMappedInitialConditionsValues({
                tree,
                conditions,
            });

            commit('__SET_STATE', {
                key: 'conditionsValues',
                value: conditionsValues,
            });
            commit('__SET_STATE', {
                key: 'tree',
                value: tree,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateConditions(
        {
            state,
        },
        {
            workflowId,
            transitionId,
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                conditions,
                tree,
                conditionsValues,
            } = state;
            const [
                from,
                to,
            ] = getFromAndToTransition(transitionId);

            let data = {
                conditions: getParsedConditions({
                    values: conditionsValues,
                    conditions,
                    tree,
                }),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Workflow/store/workflowConditions/action/updateConditions/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

            await updateTransitionConditions({
                $axios: this.app.$axios,
                workflowId,
                from,
                to,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflowConditions/action/updateConditions/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError({
                errors: e.data.errors,
                scope,
                fieldKeys: state.tree.reduce((prev, curr, index) => ({
                    ...prev,
                    [`element-${index}`]: curr.id,
                }), {}),
                getOnlyFirstError: true,
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
    }, id) {
        if (state.conditionsValues[id]) {
            commit(types.REMOVE_CONDITION_VALUE_FROM_SET, id);
        }
    },
};
