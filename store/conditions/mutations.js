/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';
import { removeFromObjectByKey } from '~/model/objectWrapper';

export const types = {
    SET_CONDITION_SET_ID: 'SET_CONDITION_SET_ID',
    SET_CONDITION_SET_CODE: 'SET_CONDITION_SET_CODE',
    SET_CONDITION_SETS: 'SET_CONDITION_SETS',
    SET_CONDITIONS: 'SET_CONDITIONS',
    ADD_CONDITION_VALUE: 'ADD_CONDITION_VALUE',
    SET_CONDITION_VALUE: 'SET_CONDITION_VALUE',
    SET_CONDITIONS_VALUES: 'SET_CONDITIONS_VALUES',
    REMOVE_CONDITION_FROM_SET: 'REMOVE_CONDITION_FROM_SET',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_CONDITION_SET_ID](state, value) {
        state.id = value;
    },
    [types.SET_CONDITION_SET_CODE](state, value) {
        state.code = value;
    },
    [types.SET_CONDITION_SETS](state, value) {
        state.conditionSets = value;
    },
    [types.SET_CONDITIONS](state, { key, value }) {
        state.conditions = { ...state.conditions, [key]: value };
    },
    [types.ADD_CONDITION_VALUE](state, { conditionId, parameterName, parameterValue }) {
        state.conditionsValues = {
            ...state.conditionsValues,
            [conditionId]: {
                [parameterName]: parameterValue,
            },
        };
    },
    [types.SET_CONDITION_VALUE](state, { conditionId, parameterName, parameterValue }) {
        state.conditionsValues[conditionId] = {
            ...state.conditionsValues[conditionId],
            [parameterName]: parameterValue,
        };
    },
    [types.SET_CONDITIONS_VALUES](state, { condition, values }) {
        state.conditionsValues = { ...state.conditionsValues, [condition]: values };
    },
    [types.REMOVE_CONDITION_FROM_SET](state, key) {
        state.conditionsValues = removeFromObjectByKey(state.conditionsValues, key);
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            if (key !== 'conditions') {
                state[key] = states[key];
            }
        });
    },
};
