/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { parsingTree, mappingTree } from '../__mocks__/categoryTree.mock';
import { categoryList } from '../__mocks__/categories.mock';
import { getParsedTreeData, getMappedTreeData } from '~/model/mappers/treeMapper';

describe('treeMapper/getParsedTreeData', () => {
    it('Tree parsing with valid input data', () => {
        const result = getParsedTreeData(parsingTree, categoryList);
        expect(result).toStrictEqual(mappingTree);
    });

    it('Tree parsing with empty categories array', () => {
        const result = getParsedTreeData(parsingTree, []);
        expect(result).toStrictEqual([]);
    });

    it('Tree parsing without input data', () => {
        const result = getParsedTreeData([], '');
        expect(result).toStrictEqual([]);
    });
});

describe('treeMapper/getMappedTreeData', () => {
    it('Tree mapping with valid input data', () => {
        const result = getMappedTreeData(mappingTree);
        expect(result).toStrictEqual(parsingTree);
    });

    it('Tree mapping without input data', () => {
        const result = getMappedTreeData([]);
        expect(result).toStrictEqual([]);
    });
});
