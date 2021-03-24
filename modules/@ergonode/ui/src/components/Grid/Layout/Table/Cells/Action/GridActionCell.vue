/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="component"
        :data-cy="dataCyGenerator"
        :column="columnIndex"
        :row-id="rowId"
        :row="rowIndex"
        :href="action.href"
        :disabled="disabled"
        :selected="selected"
        @action="onAction" />
</template>

<script>
export default {
    name: 'GridActionCell',
    props: {
        /**
         * Unique row identifier
         */
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
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
        selected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
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
