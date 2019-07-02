/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <GridCell
        :editing-allowed="column.editable || isActionCell || isFilterCell"
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLockedCell"
        :action-cell="isActionCell"
        :on-edit="onEdit">
        <Component
            :is="infoComponent"
            v-if="!isEditingCell || isActionCell"
            v-bind="infoComponentProps" />
        <GridEditActivatorCell
            v-else
            :is-select-kind="isSelectKind"
            :is-multi-select="isMultiSelect"
            :value="filterValue"
            :options="options"
            @updateValue="onUpdateFilter" />
    </GridCell>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridWrapperHeaderActionCell',
    components: {
        GridCell: () => import('~/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('~/components/Grid/EditCells/GridEditActivatorCell'),
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
            rowIndex: 1,
        };
    },
    computed: {
        ...mapState('grid', {
            gridFilter: state => state.filter,
            isSelectedAllRows: state => state.isSelectedAllRows,
            editingCellCoordinates: state => state.editingCellCoordinates,
        }),
        isEditingCell() {
            const { row, column } = this.editingCellCoordinates;

            return this.rowIndex === row && this.columnIndex === column;
        },
        isFilterCell() {
            return typeof this.column.filter !== 'undefined';
        },
        isActionCell() {
            const { type } = this.column;

            return type === 'CHECK' || type === 'ACTION';
        },
        isLockedCell() {
            return !this.isFilterCell && !this.isActionCell;
        },
        isSelectKind() {
            const { filter } = this.column;

            if (!filter) return false;
            const { type } = filter;

            return type === 'SELECT' || type === 'MULTI_SELECT';
        },
        isMultiSelect() {
            const { filter: { type } } = this.column;

            return type === 'MULTI_SELECT';
        },
        filterValue() {
            const { [this.column.id]: filter } = this.gridFilter;

            if (!filter) {
                if (this.isMultiSelect) return [];

                return '';
            }

            return filter;
        },
        filterParsedValue() {
            if (!this.column.filter) return '';

            const { [this.column.id]: filter } = this.gridFilter;

            if (filter) {
                if (Array.isArray(filter)) {
                    return filter.map(val => this.column.filter.options[val] || '').join(', ');
                }
                if (this.column.filter.options && typeof this.column.filter.options[filter] !== 'undefined') {
                    return this.column.filter.options[filter] || 'No translation';
                }

                return filter;
            }

            if (this.options) return 'Select...';

            return 'Search...';
        },
        options() {
            const { filter } = this.column;
            if (!filter || !filter.options) return null;

            const { options } = filter;
            const optionKeys = Object.keys(options);

            return optionKeys.map(key => ({ key, value: options[key] }));
        },
        infoComponent() {
            const { filter } = this.column;
            const type = !filter ? this.column.type : filter.type;

            switch (type) {
            case 'CHECK':
                return () => import('~/components/Grid/GridCheckPlaceholderCell');
            case 'SELECT':
            case 'MULTI_SELECT':
                return () => import('~/components/Grid/GridSelectInfoCell');
            default:
                return () => import('~/components/Grid/GridInfoCell');
            }
        },
        infoComponentProps() {
            const { filter } = this.column;
            const type = !filter ? this.column.type : filter.type;

            switch (type) {
            case 'CHECK':
                return {};
            case 'SELECT':
            case 'MULTI_SELECT':
                return {
                    value: this.filterParsedValue,
                    filterOptions: this.column.filter.options,
                };
            default:
                return {
                    value: this.filterParsedValue,
                };
            }
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditingCellCoordinates',
            'getData',
            'setFilter',
            'changeDisplayingPage',
        ]),
        onEdit(isEditing) {
            if (this.column.type !== 'CHECK') {
                this.setEditingCellCoordinates(isEditing
                    ? { column: this.columnIndex, row: this.rowIndex }
                    : {});
            }
        },
        onUpdateFilter(value) {
            const { id } = this.column;

            if (this.gridFilter[id] !== value) {
                this.setFilter({ id, filter: value });
                this.getData({ path: this.path });
                this.changeDisplayingPage({ number: 1 });
            }
        },
    },
};
</script>
