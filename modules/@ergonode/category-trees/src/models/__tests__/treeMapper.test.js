/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedTree,
    getParsedTree,
} from '../treeMapper';
import {
    categoryList,
} from './__mocks__/categories.mock';
import {
    mappingTree,
    parsingTree,
} from './__mocks__/categoryTree.mock';

describe('treeMapper/getMappedTree', () => {
    it('Tree parsing with valid input data', () => {
        const result = getMappedTree(parsingTree, categoryList);
        expect(result).toStrictEqual(mappingTree);
    });

    it('Tree parsing with empty categories array', () => {
        const result = getMappedTree(parsingTree, []);
        expect(result).toStrictEqual([]);
    });

    it('Tree parsing without input data', () => {
        const result = getMappedTree([], '');
        expect(result).toStrictEqual([]);
    });
});

describe('treeMapper/getParsedTree', () => {
    it('Tree mapping with valid input data', () => {
        const result = getParsedTree(mappingTree);
        expect(result).toStrictEqual(parsingTree);
    });

    it('Tree mapping without input data', () => {
        const result = getParsedTree([]);
        expect(result).toStrictEqual([]);
    });
});
