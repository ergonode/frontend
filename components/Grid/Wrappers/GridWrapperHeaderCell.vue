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
            v-if="!isExtenderColumn"
            v-bind="headerComponentProps"
            :store-namespace="storeNamespace"
            @sort="() => getData({ path })" />
    </GridCell>
</template>

<script>
import { GridHeaderType } from '~/model/grid/layout/GridHeaderType';

export default {
    name: 'GridWrapperHeaderCell',
    components: {
        GridCell: () => import('~/components/Grid/GridCell'),
    },
    props: {
        storeNamespace: {
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
            return this.$store.state[this.storeNamespace];
        },
        isActionCell() {
            const { type } = this.column;

            return type === 'CHECK' || type === 'ACTION';
        },
        headerComponent() {
            const { type } = this.column.header;

            if (type === GridHeaderType.CHECK) return () => import('~/components/Grid/EditCells/GridEditSelectRowCell');
            if (type === GridHeaderType.PLAIN) return () => import('~/components/Grid/GridBaseHeaderCell');

            return () => import('~/components/Grid/GridInteractiveHeaderCell');
        },
        isExtenderColumn() {
            return this.column.id === 'extender';
        },
        headerComponentProps() {
            const { type, title } = this.column.header;

            if (type === GridHeaderType.CHECK) return { row: this.rowIndex, multicheck: true };
            if (type === GridHeaderType.INTERACTIVE) {
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
            this.$store.dispatch(`${this.storeNamespace}/getData`, { path });
        },
        onEdit() {
            if (this.column.type === 'CHECK') {
                this.$store.dispatch(`${this.storeNamespace}/setSelectionForAllRows`, { isSelected: !this.gridState.isSelectedAllRows });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .fixed-header {
        position: sticky !important;
        top: 0;
        z-index: 8;
    }
</style>
