/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// eslint-disable-next-line jest/no-mocks-import
import { mappingTree, hiddenItems } from '../__mocks__/categoryTree.mock';
import {
    getCoordinatesForHiddenCategories,
    getNearestNeighborRowId,
    getTreeWhenElementRemoved,
    getTreeWhenGhostElementRemoved,
    getTreeWhenElementCollapse,
    getTreeWhenElementExpand,
    getFullTree,
} from '~/model/tree/TreeCalculations';

describe('TreeCalculations/getCoordinatesForHiddenCategories', () => {
    it('New positions for hidden elements (col: 2, row: 3)', () => {
        const expectedData = [
            {
                id: 'fb471778-cbe7-56ca-ace7-0edd936092d7',
                code: 'code_3',
                column: 3,
                row: 4,
                children: 0,
                expanded: false,
                name: null,
                parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            },
            {
                id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f',
                code: 'code_4',
                column: 3,
                row: 5,
                children: 0,
                expanded: false,
                name: null,
                parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            },
        ];
        const column = 2;
        const row = 3;
        const result = getCoordinatesForHiddenCategories(hiddenItems, { column, row });
        expect(result.length).toBe(2);
        expect(result).toStrictEqual(expectedData);
    });

    it('New positions for hidden elements (col: null, row: null)', () => {
        const expectedData = [
            {
                id: 'fb471778-cbe7-56ca-ace7-0edd936092d7',
                code: 'code_3',
                column: 1,
                row: 1,
                children: 0,
                expanded: false,
                name: null,
                parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            },
            {
                id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f',
                code: 'code_4',
                column: 1,
                row: 2,
                children: 0,
                expanded: false,
                name: null,
                parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            },
        ];
        const column = null;
        const row = null;
        const result = getCoordinatesForHiddenCategories(hiddenItems, { column, row });
        expect(result.length).toBe(2);
        expect(result).toStrictEqual(expectedData);
    });
});

describe('TreeCalculations/getNearestNeighborRowId', () => {
    it('Find nearest neighbor for element (col:null, row:null)', () => {
        const column = null;
        const row = null;
        const result = getNearestNeighborRowId(mappingTree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:0, row:0)', () => {
        const column = 0;
        const row = 0;
        const result = getNearestNeighborRowId(mappingTree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:1, row:1)', () => {
        const column = 1;
        const row = 1;
        const result = getNearestNeighborRowId(mappingTree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:2, row:2)', () => {
        const column = 2;
        const row = 2;
        const result = getNearestNeighborRowId(mappingTree, column, row);
        expect(result).toBe(3);
    });

    it('Find nearest neighbor for element (col:2, row:3)', () => {
        const column = 2;
        const row = 3;
        const result = getNearestNeighborRowId(mappingTree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:0, row:4)', () => {
        const column = 0;
        const row = 4;
        const result = getNearestNeighborRowId(mappingTree, column, row);
        expect(result).toBe(5);
    });

    it('Find nearest neighbor for element (col:100, row:100)', () => {
        const column = 100;
        const row = 100;
        const result = getNearestNeighborRowId(mappingTree, column, row);
        expect(result).toBe(5);
    });
});

describe('TreeCalculations/getTreeWhenElementRemoved', () => {
    it('New tree when remove not existing element', () => {
        const removedIndex = 100;
        const result = getTreeWhenElementRemoved(mappingTree, removedIndex);
        expect(result).toStrictEqual(mappingTree);
    });

    it('New tree when remove last element', () => {
        const expectedTree = JSON.parse(JSON.stringify(mappingTree)); // deep array clone hack
        const removedIndex = 4;
        const result = getTreeWhenElementRemoved(mappingTree, removedIndex);
        expectedTree.pop();
        expect(result).toStrictEqual(expectedTree);
    });

    it('New tree when remove first element', () => {
        const expectedTree = [
            {
                id: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
                code: 'code_2',
                column: 1,
                row: 0,
                children: 2,
                expanded: false,
                name: null,
                parent: 'a72bdcce-6bd6-5663-99ae-7bad19307aa6',
            },
            {
                id: 'fb471778-cbe7-56ca-ace7-0edd936092d7',
                code: 'code_3',
                column: 2,
                row: 1,
                children: 0,
                expanded: false,
                name: null,
                parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            },
            {
                id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f',
                code: 'code_4',
                column: 2,
                row: 2,
                children: 0,
                expanded: false,
                name: null,
                parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            },
            {
                id: 'b07154ca-3e19-5d69-9238-8fe2b0c5e49e',
                code: 'code_5',
                column: 0,
                row: 3,
                children: 0,
                expanded: false,
                name: null,
                parent: 'root',
            },
        ];
        const removedIndex = 0;
        const result = getTreeWhenElementRemoved(mappingTree, removedIndex);
        expect(result).toStrictEqual(expectedTree);
    });
});

describe('TreeCalculations/getTreeWhenGhostElementRemoved', () => {
    it('New tree when remove not existing ghost element (id:100)', () => {
        const removedIndex = 100;
        const result = getTreeWhenGhostElementRemoved(mappingTree, removedIndex);
        expect(result).toStrictEqual(mappingTree);
    });

    it('New tree when remove ghost element (id:0)', () => {
        const removedIndex = 0;
        const result = getTreeWhenGhostElementRemoved(mappingTree, removedIndex);
        expect(result).toStrictEqual(mappingTree);
    });

    it('New tree when remove ghost element (id:3.5)', () => {
        const expectedTree = JSON.parse(JSON.stringify(mappingTree)); // deep array clone hack
        expectedTree.splice(expectedTree.length - 1, 1, {
            id: 'b07154ca-3e19-5d69-9238-8fe2b0c5e49e',
            code: 'code_5',
            column: 0,
            row: 5,
            children: 0,
            expanded: false,
            name: null,
            parent: 'root',
        });
        const removedIndex = 3.5;
        const result = getTreeWhenGhostElementRemoved(mappingTree, removedIndex);
        expect(result).toStrictEqual(expectedTree);
    });
});

describe('TreeCalculations/getTreeWhenElementCollapse', () => {
    const visibleCategories = [
        { id: 'fb471778-cbe7-56ca-ace7-0edd936092d7', column: 1, row: 0 },
        { id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f', column: 2, row: 1 },
        { id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f', column: 2, row: 3 },
    ];
    it('New tree when collapse not existing element (id:100)', () => {
        const collapsedIndex = 100;
        const result = getTreeWhenElementCollapse(visibleCategories, collapsedIndex);
        expect(result.length).toStrictEqual(visibleCategories.length);
        expect(result).toStrictEqual(visibleCategories);
    });

    it('New tree when collapse not existing element (id:0)', () => {
        const expected = [
            { id: 'fb471778-cbe7-56ca-ace7-0edd936092d7', column: 1, row: 0 },
            { id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f', column: 2, row: 1 },
            { id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f', column: 2, row: 2 },
        ];
        const collapsedIndex = 0;
        const result = getTreeWhenElementCollapse(visibleCategories, collapsedIndex);
        expect(result.length).toStrictEqual(visibleCategories.length);
        expect(result).toStrictEqual(expected);
    });
});

describe('TreeCalculations/getTreeWhenElementExpand', () => {
    it('New tree when expand element (id:1)', () => {
        const collapsedIndex = 0;
        const result = getTreeWhenElementExpand(mappingTree, hiddenItems, collapsedIndex);
        expect(result.length).toStrictEqual(mappingTree.length + hiddenItems.length);
    });
});

describe('TreeCalculations/getFullTree', () => {
    it('Get tree when all elements', () => {
        const result = getFullTree(hiddenItems, mappingTree);
        expect(result.length).toStrictEqual(mappingTree.length);
    });
});
