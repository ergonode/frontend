/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getMappedTree(tree, categories) {
    if (!Array.isArray(categories) || categories.length <= 0) {
        return [];
    }

    const mappedTree = [];
    let rowCounter = 0;

    const buildTree = (treeArray, parent, column) => {
        for (let i = 0; i < treeArray.length; i += 1) {
            const categoryId = treeArray[i].category_id;
            const {
                code: categoryCode,
                label: categoryName,
            } = categories.find(category => category.id === categoryId);

            mappedTree.push({
                id: categoryId,
                code: categoryCode,
                name: categoryName,
                row: rowCounter,
                column,
                parent,
            });
            rowCounter += 1;
            buildTree(treeArray[i].children, categoryId, column + 1);
        }
    };

    buildTree(tree, null, 0);

    return mappedTree;
}

export function getParsedTree(treeArray) {
    const parsedTree = [];

    for (let i = 0; i < treeArray.length; i += 1) {
        const {
            parent,
            id,
        } = treeArray[i];
        const childrenElement = {
            category_id: id,
            children: [],
        };

        const setChild = (childArray) => {
            for (let j = 0; j < childArray.length; j += 1) {
                if (childArray[j].category_id === parent) {
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
