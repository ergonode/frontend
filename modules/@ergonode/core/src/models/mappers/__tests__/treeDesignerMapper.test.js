/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    apiData,
    mappedTree,
    mappedTreeWithoutReducer,
    reducer,
} from '@Core/models/mappers/__tests__/__mocks__/treeDesigner.mock';
import {
    getMappedTree,
    getParsedTree,
} from '@Core/models/mappers/treeDesignerMapper';

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

describe('treeDesignerMapper/getMappedTree', () => {
    it('Based on API data, map data to tree designer structure', () => {
        const result = getMappedTree({
            data: apiData,
            childrenId: 'children_id',
            reducer,
        });

        mappedTree.forEach((node) => {
            expect(result).toContainObject(node);
        });
    });

    describe('Incorrect input data', () => {
        it('API data is empty', () => {
            const result = getMappedTree({
                data: [],
                childrenId: 'children_id',
                reducer,
            });

            expect(result).toEqual([]);
        });

        it('Children id is not set', () => {
            const result = getMappedTree({
                data: apiData,
                childrenId: '',
                reducer,
            });

            expect(result).toEqual([]);
        });

        it('Reducer is not set', () => {
            const result = getMappedTree({
                data: apiData,
                childrenId: 'children_id',
            });

            mappedTreeWithoutReducer.forEach((node) => {
                expect(result).toContainObject(node);
            });
        });
    });
});

describe('treeDesignerMapper/getParsedTree', () => {
    it('Based on API data, map data to tree designer structure', () => {
        const result = getParsedTree({
            data: mappedTree,
            childrenId: 'children_id',
        });

        apiData.forEach((node) => {
            expect(result).toContainObject(node);
        });
    });

    describe('Incorrect input data', () => {
        it('API data is empty', () => {
            const result = getParsedTree({
                data: [],
                childrenId: 'children_id',
            });

            expect(result).toEqual([]);
        });

        it('Children id is not set', () => {
            const result = getParsedTree({
                data: mappedTree,
                childrenId: '',
            });

            expect(result).toEqual([]);
        });
    });
});
