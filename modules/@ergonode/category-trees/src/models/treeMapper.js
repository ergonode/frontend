/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getParsedTreeData(tree, categories) {
    const newTree = [];
    let rowCounter = 0;
    if (!Array.isArray(categories) || categories.length <= 0) {
        return [];
    }
    const buildTree = (treeArray, parent, column, row) => {
        for (let i = 0; i < treeArray.length; i += 1) {
            const categoryId = treeArray[i].category_id;
            const {
                length: childrenLength,
            } = treeArray[i].children;
            const {
                code: categoryCode,
                name: categoryName,
            } = categories.find(e => e.id === categoryId);

            newTree.push({
                id: categoryId,
                code: categoryCode,
                name: categoryName,
                row: rowCounter,
                column,
                parent,
                children: childrenLength,
                expanded: false,
            });
            rowCounter += 1;
            buildTree(treeArray[i].children, categoryId, column + 1);
        }
    };
    buildTree(tree, 'root', 0);
    return newTree;
}

export function getMappedTreeData(treeArray) {
    const newTree = [];
    for (let i = 0; i < treeArray.length; i += 1) {
        const {
            parent, id,
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
        if (parent === 'root') {
            newTree.push(childrenElement);
        } else {
            setChild(newTree);
        }
    }
    return newTree;
}
