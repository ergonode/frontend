/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getFlattenedTreeData({
    treeData, mappedId, reducer = () => ({}),
}) {
    if (!treeData || !mappedId) {
        return [];
    }
    const flattenedCollection = [];
    const flatStructure = (tree, parent, level) => {
        if (!tree || tree.length === 0) return;
        for (let i = 0; i < tree.length; i += 1) {
            const itemId = tree[i][mappedId];
            const {
                children,
            } = tree[i];

            flattenedCollection.push({
                id: itemId,
                parent,
                level,
                children: children.length,
                ...reducer(itemId),
            });
            flatStructure(children, itemId, level + 1);
        }
    };
    flatStructure([
        treeData,
    ], 'root', 0);

    return flattenedCollection;
}
