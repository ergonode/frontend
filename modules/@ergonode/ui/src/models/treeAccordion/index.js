/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getSelectedItems = value => value.reduce((prev, curr) => ({
    ...prev,
    [curr.id]: true,
}), {});

export const getSelectedNodes = ({
    value,
    treeStructure,
}) => {
    const nodesCount = {};

    const count = (tree) => {
        const selectedValue = value.find(({
            id,
        }) => id === tree.id);

        const sum = {
            all: 0,
            selected: 0,
        };

        (tree.children || []).forEach((node) => {
            const {
                all,
                selected,
            } = count(node);

            sum.all += all;
            sum.selected += selected;
        });

        nodesCount[tree.id] = sum;

        return {
            all: sum.all + 1,
            selected: sum.selected + (selectedValue ? 1 : 0),
        };
    };

    count({
        id: 'root',
        children: treeStructure,
    });

    delete nodesCount.root;

    return nodesCount;
};
