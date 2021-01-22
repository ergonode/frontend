/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CheckBox
        class="category-select-select-all-tree-categories"
        :value="selectionState"
        :label="$t('category.form.selectVisibleCheckBox')"
        :disabled="disabled"
        reversed
        @input="onSelectAllVisible" />
</template>

<script>
import CheckBox from '@UI/components/CheckBox/CheckBox';

export default {
    name: 'CategorySelectSelectAllTreeCheckBox',
    components: {
        CheckBox,
    },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        categories: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        categoriesIds() {
            const getMappedCategoriesIds = (treeCategories = [], result = []) => {
                const children = result;

                treeCategories.forEach((treeCategory) => {
                    children.push(treeCategory.id);

                    if (treeCategory.children) {
                        children.push(...getMappedCategoriesIds(treeCategory.children));
                    }
                });

                return children;
            };

            return getMappedCategoriesIds(this.categories);
        },
        selectionState() {
            const categoriesIdsInTree = this.categoriesIds.filter(
                categoryId => this.value.some(
                    id => id === categoryId,
                ),
            );

            if (categoriesIdsInTree.length === 0) {
                return 0;
            }

            if (categoriesIdsInTree.length === this.categoriesIds.length) {
                return 1;
            }

            return 2;
        },
    },
    methods: {
        onSelectAllVisible(value) {
            if (value) {
                this.$emit('input', [
                    ...new Set([
                        ...this.categoriesIds,
                        ...this.categories.map(category => category.id),
                    ]),
                ]);
            } else {
                this.$emit('input', this.value.filter(id => !this.categoriesIds.some(categoryId => categoryId === id)));
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-select-select-all-tree-categories {
        margin-right: 12px;
    }
</style>
