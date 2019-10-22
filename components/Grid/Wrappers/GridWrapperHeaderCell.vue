/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        class="fixed-header"
        editing-allowed
        :row="rowIndex"
        :column="columnIndex"
        :locked="!isActionCell"
        :action-cell="isActionCell"
        @edit="onEdit">
        <Component
            :is="headerComponent"
            v-bind="headerComponentProps"
            :namespace="namespace"
            @sort="() => getData({ path })"
            @focus="onFocus" />
    </GridCell>
</template>

<script>
import { GRID_HEADER_TYPE, COLUMN_TYPE } from '~/defaults/grid/main';

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
        isActionCell() {
            const { type } = this.column;

            return type === COLUMN_TYPE.CHECK || type === COLUMN_TYPE.ACTION;
        },
        headerComponent() {
            const { type } = this.column.header;

            if (type === GRID_HEADER_TYPE.CHECK) return () => import('~/components/Grid/EditCells/GridEditSelectRowCell');
            if (type === GRID_HEADER_TYPE.PLAIN) return () => import('~/components/Grid/HeaderCells/GridBaseHeaderCell');

            return () => import('~/components/Grid/HeaderCells/GridInteractiveHeaderCell');
        },
        headerComponentProps() {
            const { type, title } = this.column.header;

            if (type === GRID_HEADER_TYPE.CHECK) return { row: this.rowIndex, multicheck: true };
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
        onEdit() {
            if (this.column.type === COLUMN_TYPE.CHECK) {
                this.$store.dispatch(`${this.namespace}/setSelectionForAllRows`, { isSelected: !this.gridState.isSelectedAllRows });
            }
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>

<style lang="scss" scoped>
    .fixed-header {
        position: sticky !important;
        top: 0;
        z-index: 1;
        background-color: $background !important;
    }
</style>
