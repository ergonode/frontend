/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { removeFromObjectByKey } from '@Core/models/objectWrapper';
import defaultState from './state';

export const types = {
    SET_CONDITION_SET_ID: 'SET_CONDITION_SET_ID',
    SET_CONDITION_SETS: 'SET_CONDITION_SETS',
    SET_CONDITIONS: 'SET_CONDITIONS',
    SET_CONDITIONS_DICTIONARY: 'SET_CONDITIONS_DICTIONARY',
    ADD_CONDITION_VALUE: 'ADD_CONDITION_VALUE',
    SET_CONDITION_VALUE: 'SET_CONDITION_VALUE',
    SET_CONDITIONS_DATA: 'SET_CONDITIONS_DATA',
    REMOVE_CONDITION_VALUE_FROM_SET: 'REMOVE_CONDITION_VALUE_FROM_SET',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_CONDITION_SET_ID](state, value) {
        state.id = value;
    },
    [types.SET_CONDITION_SETS](state, value) {
        state.conditionSets = value;
    },
    [types.SET_CONDITIONS](state, { key, value }) {
        state.conditions = { ...state.conditions, [key]: value };
    },
    [types.SET_CONDITIONS_DICTIONARY](state, value) {
        state.conditionsDictionary = value;
    },
    [types.ADD_CONDITION_VALUE](state, { conditionId, parameterName, parameterValue }) {
        const condition = parameterName === null ? {} : { [parameterName]: parameterValue };

        state.conditionsValues = {
            ...state.conditionsValues,
            [conditionId]: condition,
        };
    },
    [types.SET_CONDITION_VALUE](state, { conditionId, parameterName, parameterValue }) {
        const condition = parameterName === null ? {} : { [parameterName]: parameterValue };

        state.conditionsValues[conditionId] = {
            ...state.conditionsValues[conditionId],
            ...condition,
        };
    },
    [types.SET_CONDITIONS_DATA](state, data) {
        state.conditionsValues = data;
    },
    [types.REMOVE_CONDITION_VALUE_FROM_SET](state, key) {
        state.conditionsValues = removeFromObjectByKey(state.conditionsValues, key);
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
