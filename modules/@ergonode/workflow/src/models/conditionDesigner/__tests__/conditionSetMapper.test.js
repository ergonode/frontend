/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedInitialConditionsValues,
    getMappedInitialTypeConditionsValues,
    getMappedTree,
    getParsedConditions,
} from '../conditionSetMapper';
import {
    CONDITION_TYPES,
    conditions,
    conditionSets,
    conditionSetsTree,
    conditionsValues,
    initialParsedConditions,
    parsedConditions,
    tree,
} from './__mocks__/conditions.mock';

expect.extend({
    toContainObject(received, argument) {
        const pass = this.equals(received,
            expect.arrayContaining([
                expect.objectContaining(argument),
            ]));

        if (pass) {
            return {
                message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
                pass: true,
            };
        }
        return {
            message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
            pass: false,
        };
    },
});

describe('conditionSetMapper/getMappedTree', () => {
    it('Based on API data, map condition sets to tree data structure', () => {
        const result = getMappedTree({
            conditions: conditionSets,
        }).map(({
            row,
            column,
            parent,
        }) => ({
            row,
            column,
            parent,
        }));

        expect(result).toStrictEqual(conditionSetsTree);
    });
});

describe('conditionSetMapper/getParsedConditions', () => {
    it('Based on tree data, parse tree to condition sets data structure', () => {
        const result = getParsedConditions({
            values: conditionsValues,
            conditions,
            tree,
        });

        parsedConditions.forEach((parsedCondition) => {
            expect(result).toContainObject(parsedCondition);
        });
    });
});

describe('conditionSetMapper/getMappedInitialTypeConditionsValues', () => {
    it('Based on condition sets API data, map conditions type values', () => {
        let results = {};

        Object.keys(CONDITION_TYPES).forEach((key) => {
            const result = getMappedInitialTypeConditionsValues({
                tree,
                type: key,
                parameters: conditions[key].parameters,
                values: initialParsedConditions,
            });

            results = {
                ...results,
                ...result,
            };
        });

        Object.keys(results).forEach((key) => {
            expect(results[key]).toStrictEqual(conditionsValues[key]);
        });
    });
});

describe('conditionSetMapper/getMappedInitialConditionsValues', () => {
    it('Based on condition sets API data, map conditions initial values', () => {
        const result = getMappedInitialConditionsValues({
            tree,
            conditions: parsedConditions,
        });

        Object.keys(result).forEach((key) => {
            expect(result[key]).toStrictEqual(initialParsedConditions[key]);
        });
    });
});
