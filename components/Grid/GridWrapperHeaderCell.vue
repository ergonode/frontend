/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <GridCell
        editing-allowed
        :row="rowIndex"
        :column="columnIndex"
        :locked="!isActionCell"
        :action-cell="isActionCell"
        @edit.native="onEdit">
        <Component
            :is="infoComponent"
            v-bind="infoComponentProps"
            @sort="() => getData({ path })" />
    </GridCell>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridWrapperHeaderCell',
    components: {
        GridCell: () => import('~/components/Grid/GridCell'),
    },
    props: {
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
        ...mapState('grid', {
            isSelectedAllRows: state => state.isSelectedAllRows,
            isColumnEditable: state => state.configuration.isColumnEditable,
        }),
        isActionCell() {
            const { type } = this.column;

            return type === 'CHECK' || type === 'ACTION';
        },
        infoComponent() {
            const { id } = this.column;

            if (id === 'id') return () => import('~/components/Grid/GridCheckCell');

            return () => import('~/components/Grid/GridHeaderCell');
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
        ...mapActions('grid', [
            'setSelectionForAllRows',
            'getData',
        ]),
        onEdit() {
            if (this.column.type === 'CHECK') {
                this.setSelectionForAllRows({ isSelected: !this.isSelectedAllRows });
            }
        },
    },
};
</script>
