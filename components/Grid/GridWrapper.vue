/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="gridWrapperClasses">
        <Grid :columns="columns">
            <GridColumn
                v-for="(column, colIndex) in columns"
                :key="column.id"
                :index="colIndex"
                :column="column"
                :rows-height="rowsHeight"
                :is-pinned-right="column.isRightPinned"
                :is-pinned-left="column.isLeftPinned">
                <GridWrapperHeaderCell
                    :column-index="colIndex"
                    :column="column"
                    :path="actionPaths.getData" />
                <GridWrapperHeaderActionCell
                    :column-index="colIndex"
                    :column="column"
                    :path="actionPaths.getData" />
                <GridWrapperCell
                    v-for="(row, rowIndex) in rows"
                    :key="`row[${rowIndex + 2}, ${column.id}]`"
                    :column-index="colIndex"
                    :row-index="(rowIndex + 2) * displayedPage"
                    :column="column"
                    :row="row"
                    :draft="drafts[rows[rowIndex].id]"
                    :edit-routing-path="actionPaths.routerEdit"
                    :is-selected="isSelectedAllRows
                        || selectedRows[(rowIndex + 2) * displayedPage]" />
            </GridColumn>
        </Grid>
        <GridPlaceholder v-if="isEmptyGrid" />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'GridWrapper',
    components: {
        Grid: () => import('~/components/Grid/Grid'),
        GridColumn: () => import('~/components/Grid/GridColumn'),
        GridWrapperCell: () => import('~/components/Grid/GridWrapperCell'),
        GridWrapperHeaderActionCell: () => import('~/components/Grid/GridWrapperHeaderActionCell'),
        GridWrapperHeaderCell: () => import('~/components/Grid/GridWrapperHeaderCell'),
        GridPlaceholder: () => import('~/components/Grid/GridPlaceholder'),
    },
    props: {
        rowsHeight: {
            type: Number,
            required: true,
        },
        actionPaths: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('gridDraft', {
            drafts: state => state.drafts,
        }),
        ...mapState('grid', {
            columns: state => state.columns,
            rows: state => state.rows,
            isSelectedAllRows: state => state.isSelectedAllRows,
            selectedRows: state => state.selectedRows,
            displayedPage: state => state.displayedPage,
        }),
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            isColumnDragging: state => state.isColumnDragging,
        }),
        ...mapGetters('grid', {
            numberOfPages: 'numberOfPages',
        }),
        gridWrapperClasses() {
            return [
                'grid-wrapper',
                {
                    'grid-wrapper--element-dragged': this.isListElementDragging,
                    'grid-wrapper--column-dragged': this.isColumnDragging,
                },
            ];
        },
        isEmptyGrid() {
            return !this.rows.length;
        },
    },
    destroyed() {
        this.removeValidationErrors();
    },
    methods: {
        ...mapActions('grid', [
            'getData',
        ]),
        ...mapActions('validations', [
            'removeValidationErrors',
        ]),
    },
};
</script>


<style lang="scss" scoped>
    .grid-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        height: 0;
        padding: 12px 12px 0;

        &--element-dragged {
            z-index: 11;
            background-color: $lightGrey;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &--column-dragged {
            z-index: 16;
        }
    }
</style>
