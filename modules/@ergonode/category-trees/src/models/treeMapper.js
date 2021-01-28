/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getMappedCategories({
    tree,
    categories,
}) {
    const children = [];

    tree.forEach((node) => {
        const category = categories.find(({
            id,
        }) => id === node.category_id);

        if (category) {
            children.push({
                ...category,
                children: getMappedCategories({
                    tree: node.children,
                    categories,
                }),
            });
        }
    });

    return children;
}

export function getCategoriesCount(tree) {
    let categoriesCount = 0;

    tree.forEach((node) => {
        categoriesCount += node.children.length + getCategoriesCount(node.children);
    });

    return categoriesCount;
}
