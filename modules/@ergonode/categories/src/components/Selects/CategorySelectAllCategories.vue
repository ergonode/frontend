/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CheckBox
        class="category-select-all-categories"
        :value="selectionState"
        :label="$t('@Categories.category._.selectVisibleCheckBox')"
        :disabled="disabled"
        reversed
        @input="onSelectAllVisible" />
</template>

<script>

export default {
    name: 'CategorySelectAllCheckBox',
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
        selectionState() {
            const value = this.categories.filter(
                category => this.value.some(
                    id => id === category.id,
                ),
            );

            if (value.length === 0) {
                return 0;
            }

            if (value.length === this.categories.length) {
                return 1;
            }

            return 2;
        },
    },
    methods: {
        onSelectAllVisible(value) {
            let selectedCategories = this.value.filter(
                id => !this.categories.some(category => category.id === id),
            );

            if (value) {
                selectedCategories = [
                    ...new Set([
                        ...this.value,
                        ...this.categories.map(category => category.id),
                    ]),
                ];
            }

            this.$emit('input', selectedCategories);
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-select-all-categories {
        margin-right: 12px;
    }
</style>
