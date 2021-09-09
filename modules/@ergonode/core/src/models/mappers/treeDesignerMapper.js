/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    insertValuesAtIndex,
} from '@Core/models/arrayWrapper';
import {
    deepClone,
} from '@Core/models/objectWrapper';

export function getMappedTree({
    data,
    childrenId,
    reducer = () => ({}),
}) {
    if (!data || !childrenId) {
        return [];
    }

    const mappedTree = [];
    let rowCounter = 0;

    const setNode = (tree, parent, column) => {
        if (!tree || tree.length === 0) return;

        for (let i = 0; i < tree.length; i += 1) {
            const itemId = tree[i][childrenId];
            const {
                children,
            } = tree[i];

            mappedTree.push({
                id: itemId,
                parent,
                row: rowCounter,
                column,
                ...reducer(itemId),
            });

            rowCounter += 1;

            setNode(children, itemId, column + 1);
        }
    };

    setNode(data, null, 0);

    return mappedTree;
}

export function getParsedTree({
    data,
    childrenId,
}) {
    if (!data || !childrenId) {
        return [];
    }

    const parsedTree = [];

    for (let i = 0; i < data.length; i += 1) {
        const {
            parent,
            id,
        } = data[i];
        const childrenElement = {
            [childrenId]: id,
            children: [],
        };

        const setChild = (childArray) => {
            for (let j = 0; j < childArray.length; j += 1) {
                if (childArray[j][childrenId] === parent) {
                    childArray[j].children.push(childrenElement);
                } else {
                    setChild(childArray[j].children);
                }
            }
        };

        if (parent === null) {
            parsedTree.push(childrenElement);
        } else {
            setChild(parsedTree);
        }
    }

    return parsedTree;
}

export function getMergedTreeData(items, hiddenItems) {
    let mergedItems = deepClone(items);

    const insertHiddenItems = (hidden = {}, parentIds = []) => {
        let parentIdsNumber = parentIds.length;
        const tmpHidden = {
            ...hidden,
        };

        parentIds.forEach((parentId) => {
            const itemIndex = mergedItems.findIndex(item => String(item.id) === String(parentId));

            if (itemIndex !== -1) {
                const item = mergedItems[itemIndex];
                const itemsToInsert = [];

                hidden[parentId].forEach((hiddenItem, index) => {
                    itemsToInsert.push({
                        ...hiddenItem,
                        row: item.row + index + 1,
                        column: item.column + 1,
                    });
                });

                parentIdsNumber -= 1;
                delete tmpHidden[parentId];

                for (let i = itemIndex + 1; i < mergedItems.length; i += 1) {
                    mergedItems[i].row += itemsToInsert.length;
                }

                mergedItems = insertValuesAtIndex(mergedItems, itemsToInsert, itemIndex + 1);
            }
        });

        if (parentIdsNumber) {
            insertHiddenItems(tmpHidden, Object.keys(tmpHidden));
        }
    };

    insertHiddenItems(hiddenItems, Object.keys(hiddenItems));

    return mergedItems;
}
