/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="component"
        :data="data"
        :column="column"
        :draft="draft"
        :row-id="rowId"
        :error-messages="errorMessages"
        :column-index="columnIndex"
        :row-index="rowIndex"
        :is-disabled="isDisabled"
        :is-draft="isDraft"
        :is-locked="isLocked"
        :is-copyable="isCopyable"
        :is-selected="isSelected"
        @edit-cell="onEditCell"
        @cell-value="onCellValueChange"
    />
</template>

<script>
export default {
    name: 'GridDataCell',
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
         * Component data used for filling table cell
         */
        data: {
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
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: [
                Object,
                String,
            ],
            default: '',
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
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
         * Determinate if the component is not being able to edit
         */
        isLocked: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        isDisabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is being able to copy value by mass action
         */
        isCopyable: {
            type: Boolean,
            default: false,
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
        draft() {
            return this.drafts[`${this.rowId}/${this.column.id}`];
        },
        isDraft() {
            return typeof this.drafts[`${this.rowId}/${this.column.id}`] !== 'undefined';
        },
    },
    methods: {
        onEditCell(payload) {
            this.$emit('edit-cell', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
    },
};
</script>
