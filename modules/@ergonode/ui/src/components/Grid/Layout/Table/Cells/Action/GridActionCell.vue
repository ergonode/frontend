/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="component"
        :data-cy="dataCyGenerator"
        :column="columnIndex"
        :row="rowIndex"
        :href="action.href"
        :is-selected="isSelected"
        @action="onAction" />
</template>

<script>
export default {
    name: 'GridActionCell',
    props: {
        /**
         * The component of action cell
         */
        component: {
            type: [
                Object,
                Function,
            ],
            required: true,
        },
        /**
         * The model of action cell
         */
        action: {
            type: Object,
            required: true,
        },
        /**
         * Data of the column
         */
        column: {
            type: Object,
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
         * Determines if component is selected
         */
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        dataCyGenerator() {
            return `action-${this.column.id}-${this.rowIndex}`;
        },
    },
    methods: {
        onAction(payload) {
            this.$emit('action', payload);
        },
    },
};
</script>
