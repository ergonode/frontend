/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getParsedTreeData(tree, categories) {
    const newTree = [];
    let rowCounter = 0;
    const buildTree = (treeArray, parent, column) => {
        for (let i = 0; i < treeArray.length; i += 1) {
            const categoryId = treeArray[i].category_id;
            const { length: childrenLength } = treeArray[i].childrens;
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
                expand: false,
            });
            rowCounter += 1;
            buildTree(treeArray[i].childrens, categoryId, column + 1);
        }
    };
    buildTree(tree, 'root', 0);
    return newTree;
}

export function getMappedTreeData(treeArray) {
    const newTree = [];
    for (let i = 0; i < treeArray.length; i += 1) {
        const { parent, id } = treeArray[i];
        const childrenElement = { category_id: id, childrens: [] };
        const setChild = (childArray) => {
            for (let j = 0; j < childArray.length; j += 1) {
                if (childArray[j].category_id === parent) {
                    childArray[j].childrens.push(childrenElement);
                } else {
                    setChild(childArray[j].childrens);
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
