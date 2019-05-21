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
                <GridNavigationCell
                    :row="0"
                    :column="colIndex"
                    :is-editing-allowed="column.editable
                        || column.type === 'CHECK'
                        || column.type === 'ACTION'">
                    <GridActionHeaderCell
                        v-if="column.type === 'CHECK'"
                        slot-scope="{isAction}"
                        :is-selected="isAction" />
                    <GridHeaderCell
                        v-else-if="column.id !== 'extender'"
                        :is-pinned-column="column.isLeftPinned || column.isRightPinned"
                        :column-id="column.id"
                        :column="colIndex"
                        :is-column-editable="isColumnEditable"
                        :title="getTitleForColumn(column)"
                        @sort="getDataWrapper" />
                </GridNavigationCell>
                <GridNavigationCell
                    :row="1"
                    :column="colIndex"
                    :is-editing-allowed="Boolean(column.filter)">
                    <GridFilterCell
                        slot-scope="{isEditing}"
                        :is-editing="isEditing"
                        :column-id="column.id"
                        :filter="column.filter"
                        @onFilterChange="onFilterChange" />
                </GridNavigationCell>
                <GridNavigationCell
                    v-for="(row, rowIndex) in rows"
                    :key="`row[${rowIndex + 2}, ${column.id}]`"
                    :row="rowIndex + 2"
                    :column="colIndex"
                    :is-selected="isSelectedAllRows || selectedRows[rowIndex + 2]"
                    :is-editing-allowed="column.editable
                        || column.type === 'CHECK'
                        || column.type === 'ACTION'">
                    <GridDataCell
                        slot-scope="{isFocused, isEditing, isAction}"
                        :is-focused="isFocused"
                        :is-editing="isEditing"
                        :is-action="isAction"
                        :is-editable="column.editable"
                        :draft="drafts[row.id]"
                        :column-type="columns[colIndex].type"
                        :language-code="column.language"
                        :row="rowIndex + 2"
                        :cell-value="row[column.id]"
                        :filter="column.filter"
                        :column-id="column.id"
                        :row-id="row.id"
                        :element-id="column.element_id"
                        :action-path="actionPaths.routerEdit" />
                </GridNavigationCell>
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
        GridHeaderCell: () => import('~/components/Grid/GridHeaderCell'),
        GridActionHeaderCell: () => import('~/components/Grid/GridActionHeaderCell'),
        GridFilterCell: () => import('~/components/Grid/GridFilterCell'),
        GridNavigationCell: () => import('~/components/Grid/GridNavigationCell'),
        GridDataCell: () => import('~/components/Grid/GridDataCell'),
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
            isColumnEditable: state => state.configuration.isColumnEditable,
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
            'setFilter',
            'changeDisplayingPage',
            'changeNumberOfDisplayingElements',
            'clearData',
        ]),
        ...mapActions('validations', [
            'removeValidationErrors',
        ]),
        onFilterChange({ id, filter }) {
            this.setFilter({ id, filter });
            this.getDataWrapper();
            this.changeDisplayingPage({ number: 1 });
        },
        getTitleForColumn(column) {
            const {
                id,
                type,
                label,
                language,
                parameter,
            } = column;
            let suffix = '';
            const columnIDs = id.split(':');

            if (type === 'PRICE') {
                suffix = parameter.currency;
            }
            if (type === 'ACTION' && label === null) {
                return 'Edit';
            }

            if (!language) {
                return `${label} ${suffix}`;
            }

            if (columnIDs.length > 1) {
                return `${label || id} ${suffix}`;
            }

            return label
                ? `${label} ${language} ${suffix}`
                : `${id} ${language} ${suffix}`;
        },
        getDataWrapper() {
            const { getData: path } = this.actionPaths;
            this.getData({ path });
        },
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
