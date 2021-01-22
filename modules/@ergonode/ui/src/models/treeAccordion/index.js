/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getSelectedItems = value => value.reduce((prev, curr) => ({
    ...prev,
    [curr.id]: true,
}), {});

export const getSelectedNodesCount = ({
    value,
    treeStructure,
}) => {
    const nodesCount = {};

    const count = (tree) => {
        let sum = 0;

        (tree.children || []).forEach((node) => {
            sum += count(node);
        });

        const selectedValue = value.find(({
            id,
        }) => id === tree.id);

        nodesCount[tree.id] = sum;

        return sum + (selectedValue ? 1 : 0);
    };

    count({
        id: 'root',
        children: treeStructure,
    });

    delete nodesCount.root;

    return nodesCount;
};
