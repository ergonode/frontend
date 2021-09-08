/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    getUUID,
} from '@Core/models/stringWrapper';

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

export function getTreeCategoryIds(tree) {
    const categoryIds = [];

    tree.forEach((node) => {
        categoryIds.push(node.category_id);

        categoryIds.push(...getTreeCategoryIds(node.children));
    });

    return categoryIds;
}

export function getTreesCategoryIds(trees) {
    let categoryIds = new Set();

    trees.forEach((tree) => {
        categoryIds = new Set([
            ...categoryIds,
            ...getTreeCategoryIds(tree.categories),
        ]);
    });

    return Array.from(categoryIds);
}

export function getCategoriesCount(tree) {
    let categoriesCount = 0;

    tree.forEach((node) => {
        categoriesCount += 1 + getCategoriesCount(node.children);
    });

    return categoriesCount;
}

export function getUnassignedCategoriesTree({
    trees,
    categories,
    notAssignedTreeLabel,
}) {
    const categoryIds = getTreesCategoryIds(trees);
    const children = categories.filter(
        category => !categoryIds.some(id => category.id === id),
    ).map(category => ({
        ...category,
        notAssigned: true,
    }));

    return {
        id: getUUID(),
        name: notAssignedTreeLabel,
        children,
        itemsCount: children.length,
    };
}

export function getCategoryTrees({
    trees,
    categories,
    languageCode,
    notAssignedTreeLabel,
}) {
    return [
        ...trees
            .map(tree => ({
                ...tree,
                name: tree.name[languageCode] || tree.code,
                children: getMappedCategories({
                    tree: tree.categories || [],
                    categories,
                }),
                itemsCount: getCategoriesCount(tree.categories),
            })),
        getUnassignedCategoriesTree({
            trees,
            categories,
            notAssignedTreeLabel,
        }),
    ].filter(tree => tree.itemsCount > 0);
}
