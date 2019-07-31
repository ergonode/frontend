/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="gridWrapperClasses">
        <Grid
            :columns="gridState.columns"
            :is-placeholder="isEmptyGrid">
            <GridColumn
                v-for="(column, colIndex) in gridState.columns"
                :key="column.id"
                :store-namespace="storeNamespace"
                :index="colIndex"
                :column="column"
                :rows-height="rowsHeight"
                :is-pinned-right="column.isRightPinned"
                :is-pinned-left="column.isLeftPinned"
                :is-column-resizeable="gridState.configuration.isColumnResizeable"
                :is-column-moveable="gridState.configuration.isColumnMoveable">
                <GridWrapperHeaderCell
                    :store-namespace="storeNamespace"
                    :column-index="colIndex"
                    :column="column"
                    :path="actionPaths.getData" />
                <GridWrapperHeaderActionCell
                    :store-namespace="storeNamespace"
                    :column-index="colIndex"
                    :column="column"
                    :path="actionPaths.getData" />
                <GridWrapperCell
                    v-for="(row, rowIndex) in gridState.rows"
                    :key="`row[${rowIndex + 2}, ${column.id}]`"
                    :store-namespace="storeNamespace"
                    :column-index="colIndex"
                    :row-index="(rowIndex + 2) * gridState.displayedPage"
                    :column="column"
                    :row="row"
                    :draft="drafts[gridState.rows[rowIndex].id]"
                    :edit-routing-path="actionPaths.routerEdit"
                    :is-selected="gridState.isSelectedAllRows
                        || gridState.selectedRows[(rowIndex + 2) * gridState.displayedPage]" />
            </GridColumn>
        </Grid>
        <GridPlaceholder v-if="isEmptyGrid" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridWrapper',
    components: {
        Grid: () => import('~/components/Grid/Grid'),
        GridColumn: () => import('~/components/Grid/GridColumn'),
        GridWrapperCell: () => import('~/components/Grid/Wrappers/GridWrapperCell'),
        GridWrapperHeaderActionCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderActionCell'),
        GridWrapperHeaderCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderCell'),
        GridPlaceholder: () => import('~/components/Grid/GridPlaceholder'),
    },
    props: {
        storeNamespace: {
            type: String,
            required: true,
        },
        rowsHeight: {
            type: Number,
            required: true,
        },
        actionPaths: {
            type: Object,
            required: true,
        },
    },
    destroyed() {
        this.removeValidationErrors();
    },
    computed: {
        ...mapState('gridDraft', {
            drafts: state => state.drafts,
        }),
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        numberOfPages() {
            return this.$store.getters[`${this.storeNamespace}/numberOfPages`];
        },
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            isColumnDragging: state => state.isColumnDragging,
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
            return !this.gridState.rows.length;
        },
    },
    methods: {
        ...mapActions('validations', [
            'removeValidationErrors',
        ]),
    },
};
</script>


<style lang="scss" scoped>
    .grid-wrapper {
        display: flex;
        flex: 1 1 auto;
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
