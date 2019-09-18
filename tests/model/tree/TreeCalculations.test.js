/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
  getNearestNeighborRowId,
  getTreeWhenElementRemoved,
  getTreeWhenGhostElementRemoved,
} from '~/model/tree/TreeCalculations';

/*
Tree example
    0      1      2
---------------------------
0|  code_1
1|        code_2
2|              code_3
3|              code_4
4|  code_5
*/
const tree = [
    {
        id: "code_1",
        code: "code_1",
        column: 0,
        row: 0,
        children: 1,
        expanded: false,
        name: null,
        parent: "root",
    },
    {
        id: "code_2",
        code: "code_2",
        column: 1,
        row: 1,
        children: 0,
        expanded: false,
        name: null,
        parent: "code_1",
    },
    {
        id: "code_3",
        code: "code_3",
        column: 2,
        row: 2,
        children: 0,
        expanded: false,
        name: null,
        parent: "code_2",
    },
    {
        id: "code_4",
        code: "code_4",
        column: 2,
        row: 3,
        children: 0,
        expanded: false,
        name: null,
        parent: "code_2",
    },
    {
        id: "code_5",
        code: "code_5",
        column: 0,
        row: 4,
        children: 0,
        expanded: false,
        name: null,
        parent: "root",
    },
];

describe('TreeCalculations/getNearestNeighborRowId', () => {
    it('Find nearest neighbor for element (col:null, row:null)', () => {
        const column = null;
        const row = null;
        const result = getNearestNeighborRowId(tree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:0, row:0)', () => {
        const column = 0;
        const row = 0;
        const result = getNearestNeighborRowId(tree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:1, row:1)', () => {
        const column = 1;
        const row = 1;
        const result = getNearestNeighborRowId(tree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:2, row:2)', () => {
        const column = 2;
        const row = 2;
        const result = getNearestNeighborRowId(tree, column, row);
        expect(result).toBe(3);
    });

    it('Find nearest neighbor for element (col:2, row:3)', () => {
        const column = 2;
        const row = 3;
        const result = getNearestNeighborRowId(tree, column, row);
        expect(result).toBe(4);
    });

    it('Find nearest neighbor for element (col:0, row:4)', () => {
        const column = 0;
        const row = 4;
        const result = getNearestNeighborRowId(tree, column, row);
        expect(result).toBe(5);
    });

    it('Find nearest neighbor for element (col:100, row:100)', () => {
        const column = 100;
        const row = 100;
        const result = getNearestNeighborRowId(tree, column, row);
        expect(result).toBe(5);
    });
});

describe('TreeCalculations/getTreeWhenElementRemoved', () => {
    it('New tree when remove not existing element', () => {
        const removedIndex = 100;
        const result = getTreeWhenElementRemoved(tree, removedIndex);
        expect(result).toStrictEqual(tree);
    });

    it('New tree when remove last element', () => {
        const expectedTree = JSON.parse(JSON.stringify(tree)); // deep array clone hack
        const removedIndex = 4;
        const result = getTreeWhenElementRemoved(tree, removedIndex);
        expectedTree.pop();
        expect(result).toStrictEqual(expectedTree);
    });

    it('New tree when remove first element', () => {
        const expectedTree = [
            {
                id: "code_2",
                code: "code_2",
                column: 1,
                row: 0,
                children: 0,
                expanded: false,
                name: null,
                parent: "code_1",
            },
            {
                id: "code_3",
                code: "code_3",
                column: 2,
                row: 1,
                children: 0,
                expanded: false,
                name: null,
                parent: "code_2",
            },
            {
                id: "code_4",
                code: "code_4",
                column: 2,
                row: 2,
                children: 0,
                expanded: false,
                name: null,
                parent: "code_2",
            },
            {
                id: "code_5",
                code: "code_5",
                column: 0,
                row: 3,
                children: 0,
                expanded: false,
                name: null,
                parent: "root",
            },
        ];
        const removedIndex = 0;
        const result = getTreeWhenElementRemoved(tree, removedIndex);
        expect(result).toStrictEqual(expectedTree);
    });
});

describe('TreeCalculations/getTreeWhenGhostElementRemoved', () => {
  it('New tree when remove not existing ghost element (id:100)', () => {
      const removedIndex = 100;
      const result = getTreeWhenGhostElementRemoved(tree, removedIndex);
      expect(result).toStrictEqual(tree);
  });

  it('New tree when remove ghost element (id:0)', () => {
      const removedIndex = 0;
      const result = getTreeWhenGhostElementRemoved(tree, removedIndex);
      expect(result).toStrictEqual(tree);
  });
});
