/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="component"
        :value="value"
        :row-index="rowIndex"
        :column-index="columnIndex"
        :column-id="columnId"
        :language-code="languageCode"
        :data="filter"
        @edit-filter-cell="onEditFilterCell"
        @filter-value="onFilterValueChange"
        @filter-clear="onFilterValueClear" />
</template>

<script>
export default {
    name: 'GridFilterDataCell',
    props: {
        /**
         * The component of data cell
         */
        component: {
            type: [
                Object,
                Function,
            ],
            required: true,
        },
        /**
         * Row index of given component at the loop
         */
        rowIndex: {
            type: Number,
            required: true,
        },
        /**
         * Column index of given component at the loop
         */
        columnIndex: {
            type: Number,
            required: true,
        },
        /**
         * Unique column identifier
         */
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Filter data model
         */
        filter: {
            type: Object,
            default: null,
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            default: '',
        },
    },
    methods: {
        onEditFilterCell(payload) {
            this.$emit('edit-filter-cell', payload);
        },
        onFilterValueChange(payload) {
            this.$emit('filter-value', payload);
        },
        onFilterValueClear(payload) {
            this.$emit('filter-clear', payload);
        },
    },
};
</script>
