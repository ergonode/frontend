/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getParsedTree(treeArray) {
    const parsedTree = [];

    for (let i = 0; i < treeArray.length; i += 1) {
        const {
            parent, id,
        } = treeArray[i];
        const childrenElement = {
            language_id: id,
            children: [],
        };
        const setChild = (childArray) => {
            for (let j = 0; j < childArray.length; j += 1) {
                if (childArray[j].language_id === parent) {
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
