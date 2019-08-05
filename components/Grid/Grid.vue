/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        ref="grid"
        :class="['grid', {'grid--placeholder': isPlaceholder}]"
        :style="templateColumns">
        <GridColumn
            v-for="(column, colIndex) in gridState.columns"
            :key="column.id"
            :store-namespace="storeNamespace"
            :index="colIndex"
            :column="column"
            :is-last="gridState.columns.length - 1 === colIndex"
            :rows-height="rowsHeight">
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
        <GridColumnSentinel
            v-for="(value, columnId, index) in gridState.pinnedColumns"
            :key="index"
            :style="{gridColumn: value.position}"
            :column-id="columnId"
            :pinned-state="value.pinned"
            @sticky="onStickyChange" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { sum } from '~/model/arrayWrapper';

export default {
    name: 'Grid',
    components: {
        GridColumn: () => import('~/components/Grid/GridColumn'),
        GridColumnSentinel: () => import('~/components/Grid/GridColumnSentinel'),
        GridWrapperCell: () => import('~/components/Grid/Wrappers/GridWrapperCell'),
        GridWrapperHeaderActionCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderActionCell'),
        GridWrapperHeaderCell: () => import('~/components/Grid/Wrappers/GridWrapperHeaderCell'),
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
        isPlaceholder: {
            type: Boolean,
            required: true,
        },
        actionPaths: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            rightPinnedColumns: [],
            leftPinnedColumns: [],
        };
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
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        columnWidths() {
            return this.gridState.columns.map(column => (+column.minWidth ? `minmax(max-content, ${column.minWidth}px)` : column.minWidth));
        },
    },
    methods: {
        onStickyChange({ sticky, columnId, state }) {
            const columnIndex = this.gridState.columns.findIndex(col => col.id === columnId);
            const { children: columnEls } = this.$el;
            const columnEl = columnEls[columnIndex];

            if (sticky) {
                if (state === 'RIGHT') {
                    columnEl.style.right = `${sum(this.rightPinnedColumns.map(col => col.width))}px`;
                    this.rightPinnedColumns.push({
                        index: columnIndex, width: columnEl.offsetWidth,
                    });
                    columnEl.classList.add('drop-shadow-right-pinned');
                } else {
                    columnEl.style.left = `${sum(this.leftPinnedColumns.map(col => col.width))}px`;
                    this.leftPinnedColumns.push({
                        index: columnIndex, width: columnEl.offsetWidth,
                    });
                    columnEl.classList.add('drop-shadow-left-pinned');
                }
                columnEl.classList.add('sticky');
            } else {
                if (state === 'RIGHT') {
                    const indexToRemove = this.rightPinnedColumns.length - 1;

                    columnEl.classList.remove('drop-shadow-right-pinned');
                    this.rightPinnedColumns.splice(indexToRemove, 1);
                    columnEl.style.right = null;
                } else {
                    const indexToRemove = this.leftPinnedColumns.length - 1;

                    columnEl.classList.remove('drop-shadow-left-pinned');
                    this.leftPinnedColumns.splice(indexToRemove, 1);
                    columnEl.style.left = null;
                }
                columnEl.classList.remove('sticky');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid {
        position: relative;
        display: grid;
        border: 1px solid $grey;
        background-color: $background;
        border-bottom: none;
        overflow: auto;

        &--placeholder {
            flex-shrink: 0;
        }
    }
</style>
