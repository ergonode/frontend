/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
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
