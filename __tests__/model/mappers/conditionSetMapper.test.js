/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// eslint-disable-next-line jest/no-mocks-import
import { conditionsTree, conditionValues, mappedData } from '../__mocks__/conditions.mock';
import { getMappedConditionSetData, getParsedConditionSetData } from '~/model/mappers/conditionSetMapper';

describe('conditionSetMapper/getMappedConditionSetData', () => {
    it('Tree mapping with valid input data', () => {
        const result = getMappedConditionSetData(conditionsTree, conditionValues);
        expect(result).toStrictEqual(mappedData);
    });

    it('Tree mapping with empty values data', () => {
        const expected = [
            { type: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION' },
            { type: 'ATTRIBUTE_EXISTS_CONDITION' },
        ];
        const result = getMappedConditionSetData(conditionsTree, []);
        expect(result).toStrictEqual(expected);
    });

    it('Tree mapping without input data', () => {
        const result = getMappedConditionSetData([], []);
        expect(result).toStrictEqual([]);
    });
});

describe('conditionSetMapper/getParsedConditionSetData', () => {
    it('Tree parsing with input data', () => {
        const result = getParsedConditionSetData(mappedData);
        expect(result.conditionsTree.length).toStrictEqual(mappedData.length);
        expect(Object.keys(result.conditionsData).length).toStrictEqual(mappedData.length);
    });
    it('Tree parsing without data', () => {
        const expected = {
            conditionsTree: [],
            conditionsData: {},
        };
        const result = getParsedConditionSetData([]);
        expect(result).toStrictEqual(expected);
    });
});
