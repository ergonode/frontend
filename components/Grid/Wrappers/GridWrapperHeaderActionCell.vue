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
        :editing="isEditingCell"
        @edit="onEdit">
        <template v-if="!isExtenderColumn">
            <Component
                :is="infoComponent"
                v-if="!isEditingCell || isActionCell"
                v-bind="infoComponentProps" />
            <GridEditActivatorCell
                v-else
                :store-namespace="storeNamespace"
                :is-select-kind="isSelectKind"
                :is-multi-select="isMultiSelect"
                :value="filterValue"
                :options="options"
                @updateValue="onUpdateFilter" />
        </template>
    </GridCell>
</template>

<script>

export default {
    name: 'GridWrapperHeaderActionCell',
    components: {
        GridCell: () => import('~/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('~/components/Grid/EditCells/GridEditActivatorCell'),
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
            rowIndex: 1,
        };
    },
    computed: {
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        isExtenderColumn() {
            return this.column.id === 'extender';
        },
        isEditingCell() {
            const { row, column } = this.gridState.editingCellCoordinates;

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
            const { [this.column.id]: filter } = this.gridState.filter;

            if (!filter) {
                if (this.isMultiSelect) return [];

                return '';
            }

            return filter;
        },
        filterParsedValue() {
            if (!this.column.filter) return '';

            const { [this.column.id]: filter } = this.gridState.filter;

            if (filter) {
                if (Array.isArray(filter)) {
                    return filter.map(val => this.column.filter.options[val] || 'No translation').join(', ');
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
        onEdit(isEditing) {
            if (this.column.type !== 'CHECK') {
                this.$store.dispatch(`${this.storeNamespace}/setEditingCellCoordinates`, isEditing
                    ? { column: this.columnIndex, row: this.rowIndex }
                    : {});
            }
        },
        onUpdateFilter(value) {
            const { id } = this.column;

            if (this.gridState.filter[id] !== value) {
                this.$store.dispatch(`${this.storeNamespace}/setFilter`, { id, filter: value });
                this.$store.dispatch(`${this.storeNamespace}/getData`, { path: this.path });
                this.$store.dispatch(`${this.storeNamespace}/changeDisplayingPage`, 1);
            }
        },
    },
};
</script>
