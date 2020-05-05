/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getParsedTreeData(tree, languages) {
    if (!Array.isArray(languages) || languages.length <= 0) return [];

    let rowCounter = 0;
    const newTree = [];
    const buildTree = (treeArray, parent, column) => {
        for (let i = 0; i < treeArray.length; i += 1) {
            const languageCode = treeArray[i].language;
            const { length: childrenLength } = treeArray[i].children;
            const {
                id: languageId,
                name: languageName,
            } = languages.find(e => e.code === languageCode);
            newTree.push({
                id: languageId,
                code: languageCode,
                name: languageName,
                row: rowCounter,
                column,
                parent,
                children: childrenLength,
                expanded: false,
            });
            rowCounter += 1;
            buildTree(treeArray[i].children, languageId, column + 1);
        }
    };
    buildTree([tree], 'root', 0);
    return newTree;
}

export function getMappedTreeData(treeArray) {
    const newTree = [];

    for (let i = 0; i < treeArray.length; i += 1) {
        const { parent, id } = treeArray[i];
        const childrenElement = { language: id, children: [] };
        const setChild = (childArray) => {
            for (let j = 0; j < childArray.length; j += 1) {
                if (childArray[j].language === parent) {
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
