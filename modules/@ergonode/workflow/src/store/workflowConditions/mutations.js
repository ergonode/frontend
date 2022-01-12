/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeObjectProperty,
} from '@Core/models/objectWrapper';

export const types = {
    SET_CONDITIONS: 'SET_CONDITIONS',
    SET_CONDITIONS_VALUES: 'SET_CONDITIONS_VALUES',
    ADD_CONDITION_VALUE: 'ADD_CONDITION_VALUE',
    SET_CONDITION_VALUE: 'SET_CONDITION_VALUE',
    REMOVE_CONDITION_VALUE_FROM_SET: 'REMOVE_CONDITION_VALUE_FROM_SET',
};

export default {
    [types.SET_CONDITIONS](state, {
        key, value,
    }) {
        state.conditions = {
            ...state.conditions,
            [key]: value,
        };
    },
    [types.SET_CONDITIONS_VALUES](state, values) {
        state.conditionsValues = {
            ...state.conditionsValues,
            ...values,
        };
    },
    [types.ADD_CONDITION_VALUE](state, {
        conditionId,
        parameterName,
        parameterValue,
    }) {
        const condition = parameterName === null ? {} : {
            [parameterName]: parameterValue,
        };

        state.conditionsValues = {
            ...state.conditionsValues,
            [conditionId]: condition,
        };
    },
    [types.SET_CONDITION_VALUE](state, {
        conditionId, parameterName, parameterValue,
    }) {
        const condition = parameterName === null ? {} : {
            [parameterName]: parameterValue,
        };

        state.conditionsValues[conditionId] = {
            ...state.conditionsValues[conditionId],
            ...condition,
        };
    },
    [types.REMOVE_CONDITION_VALUE_FROM_SET](state, key) {
        state.conditionsValues = removeObjectProperty(state.conditionsValues, key);
    },
};
