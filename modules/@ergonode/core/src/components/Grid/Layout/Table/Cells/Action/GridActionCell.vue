/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="actionCellComponent"
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
        action: {
            type: Object,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            default: '',
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        isSelected: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        actionCellComponent() {
            return () => import(`@Core/components/Grid/Layout/Table/Cells/Action/Grid${this.type}ActionCell`)
                .catch(() => import('@Core/components/Grid/Layout/Table/Cells/GridTableCell'));
        },
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
