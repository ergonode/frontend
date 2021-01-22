/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CheckBox
        class="category-select-select-all-categories"
        :value="selectionState"
        :label="$t('category.form.selectVisibleCheckBox')"
        :disabled="disabled"
        reversed
        @input="onSelectAllVisible" />
</template>

<script>
import CheckBox from '@UI/components/CheckBox/CheckBox';

export default {
    name: 'CategorySelectSelectAllCheckBox',
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
            if (value) {
                this.$emit('input', [
                    ...new Set([
                        ...this.value,
                        ...this.categories.map(category => category.id),
                    ]),
                ]);
            } else {
                this.$emit('input', this.value.filter(id => !this.categories.some(category => category.id === id)));
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-select-select-all-categories {
        margin-right: 12px;
    }
</style>
