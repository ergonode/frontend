/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :editing-allowed="false"
        :row="rowIndex"
        :column="columnIndex"
        :locked="true"
        :action-cell="false">
        <Component
            :is="headerComponent"
            v-bind="headerComponentProps"
            :namespace="namespace"
            @sort="getData"
            @focus="onFocus" />
    </GridCell>
</template>

<script>
import { GRID_HEADER_TYPE } from '~/defaults/grid';

export default {
    name: 'GridHeaderCell',
    components: {
        GridCell: () => import('~/core/components/Grid/GridCell'),
    },
    props: {
        namespace: {
            type: String,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        isColumnEditable: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        gridState() {
            return this.$store.state[this.namespace];
        },
        headerComponent() {
            const { type } = this.column.header;

            if (type === GRID_HEADER_TYPE.PLAIN) return () => import('~/core/components/Grid/PresentationCells/GridPresentationHeaderCell');

            return () => import('~/core/components/Grid/PresentationCells/GridPresentationInteractiveHeaderCell');
        },
        headerComponentProps() {
            const {
                title,
                hint,
                type,
                suffix,
            } = this.column.header;

            if (type === GRID_HEADER_TYPE.INTERACTIVE) {
                return {
                    columnIndex: this.columnIndex,
                    column: this.column,
                    isColumnEditable: this.isColumnEditable,
                };
            }

            return {
                title,
                hint,
                suffix,
            };
        },
    },
    methods: {
        getData() {
            this.$store.dispatch(`${this.namespace}/getData`, this.path);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
