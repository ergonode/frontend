/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    getSelectedItems,
    getSelectedNodes,
} from '@UI/models/treeAccordion';
import {
    selectedNodes,
    selectedValue,
    tree,
    value,
} from '@UI/models/treeAccordion/__tests__/__mocks__';

describe('treeAccordion/getSelectedItems', () => {
    it('Mapping value items into look at map', () => {
        const result = getSelectedItems(value);

        expect(result).toStrictEqual(selectedValue);
    });
});

describe('treeAccordion/getSelectedNodes', () => {
    it('Based on value getting sum of selected children nodes', () => {
        const result = getSelectedNodes({
            value,
            treeStructure: tree,
        });

        expect(result).toStrictEqual(selectedNodes);
    });
});
