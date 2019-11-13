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
            @sort="() => getData({ path })"
            @focus="onFocus" />
    </GridCell>
</template>

<script>
import { GRID_HEADER_TYPE } from '~/defaults/grid';

export default {
    name: 'GridWrapperHeaderCell',
    components: {
        GridCell: () => import('~/components/Grid/GridCell'),
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
        column: {
            type: Object,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            rowIndex: 0,
        };
    },
    computed: {
        gridState() {
            return this.$store.state[this.namespace];
        },
        headerComponent() {
            const { type } = this.column.header;

            if (type === GRID_HEADER_TYPE.PLAIN) return () => import('~/components/Grid/HeaderCells/GridBaseHeaderCell');

            return () => import('~/components/Grid/HeaderCells/GridInteractiveHeaderCell');
        },
        headerComponentProps() {
            const { type, title } = this.column.header;

            if (type === GRID_HEADER_TYPE.INTERACTIVE) {
                return {
                    columnIndex: this.columnIndex,
                    column: this.column,
                    isColumnEditable: this.gridState.configuration.isColumnEditable,
                };
            }

            return {
                header: title,
            };
        },
    },
    methods: {
        getData({ path }) {
            this.$store.dispatch(`${this.namespace}/getData`, { path });
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
