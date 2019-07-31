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
        :on-edit="onEdit">
        <Component
            :is="infoComponent"
            v-if="!isExtenderColumn"
            v-bind="infoComponentProps"
            :store-namespace="storeNamespace"
            @sort="() => getData({ path })" />
    </GridCell>
</template>

<script>

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
        isColumnEditable() {
            return this.gridState.configuration.isColumnEditable;
        },
        isSelectedAllRows() {
            return this.gridState.isSelectedAllRows;
        },
        isActionCell() {
            const { type } = this.column;

            return type === 'CHECK' || type === 'ACTION';
        },
        infoComponent() {
            const { id } = this.column;

            if (id === 'id') return () => import('~/components/Grid/GridCheckCell');

            return () => import('~/components/Grid/GridHeaderCell');
        },
        isExtenderColumn() {
            return this.column.id === 'extender';
        },
        infoComponentProps() {
            const { id } = this.column;

            if (id === 'id') return { row: this.rowIndex, isHeader: true };

            return {
                columnIndex: this.columnIndex,
                column: this.column,
                isColumnEditable: this.isColumnEditable,
            };
        },
    },
    methods: {
        getData({ path }) {
            this.$store.dispatch(`${this.storeNamespace}/getData`, { path });
        },
        onEdit() {
            if (this.column.type === 'CHECK') {
                this.$store.dispatch(`${this.storeNamespace}/setSelectionForAllRows`, { isSelected: !this.isSelectedAllRows });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .fixed-header {
        position: sticky !important;
        top: 0;
        z-index: 5;
    }
</style>
