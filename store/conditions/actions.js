/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

// const onDefaultError = () => {};

export default {
    getConditionById(
        { commit },
        { conditionId },
    ) {
        // const { language: userLanguageCode } = rootState.authentication.user;
        // return this.app.$axios.$get(`${userLanguageCode}/conditon/${conditionId}`).then((data) => {
        const data = {
            type: 'ATTRIBUTE_EXISTS_CONDITION',
            name: 'Attribute exists',
            phrase: 'Attribute [attribute] exists, [test] + [info]',
            parameters: [
                {
                    name: 'test',
                    type: 'TEXT',
                },
                {
                    name: 'info',
                    type: 'TEXT',
                },
                {
                    name: 'attribute',
                    type: 'SELECT',
                    options: {
                        code_1111: 'code_1',
                        code_2222: 'code_2',
                        code_3333: 'code_3',
                        code_4444: 'code_4',
                        code_5: 'code_5',
                        code_6: 'code_6',
                        code_7: 'code_7',
                        code_8: 'code_8',
                        code_9: 'code_9',
                        code_10: 'code_10',
                        code_11: 'code_11',
                        code_12: 'code_12',
                    },
                },
            ],
        };
        commit(types.SET_CONDITIONS, { key: conditionId, value: data });
        // }).catch(onDefaultError);
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
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
