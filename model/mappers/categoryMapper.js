/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getMappedCategoryValues(categories, selectedCategories) {
    return categories.filter(
        (category) => selectedCategories.some(
            (selectedCategory) => category.code === selectedCategory,
        ),
    ).map((category) => ({ key: category.code, value: category.name }));
}

export function getMappedTemplateName(templates, selectedTemplate) {
    return templates.find((tmp) => tmp.id === selectedTemplate).name;
}

export function getMappedCategoryID(categories, selectedCategories) {
    return categories.filter(
        (category) => selectedCategories.some(
            (selectedCategory) => category.code === selectedCategory.key,
        ),
    ).map((category) => category.id);
}

export default {
    getMappedCategoryValues,
    getMappedCategoryID,
};
