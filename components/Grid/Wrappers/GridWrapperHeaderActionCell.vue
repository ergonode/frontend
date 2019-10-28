/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :editing-allowed="(column.editable && isActionCell) || isFilterCell"
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLockedCell"
        :action-cell="isActionCell"
        :editing="isEditingCell"
        @edit="onEdit"
        @dismissEditDialog="onDismissEditDialog">
        <Component
            :is="infoComponent"
            v-if="!isEditingCell || isActionCell"
            :value="filterParsedValue" />
        <GridEditActivatorCell
            v-else
            :namespace="namespace"
            :is-multi-select="isMultiSelect"
            :type="filterType"
            :value="filterValue"
            :options="options"
            :colors="column.colors || null"
            :fixed-width="$el.offsetWidth"
            @updateValue="onUpdateFilter" />
    </GridCell>
</template>

<script>
import { FILTER_OPERATOR } from '~/defaults/operators';

export default {
    name: 'GridWrapperHeaderActionCell',
    components: {
        GridCell: () => import('~/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('~/components/Grid/EditCells/GridEditActivatorCell'),
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
        filter: {
            type: Object,
            default: null,
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
            return this.$store.state[this.namespace];
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
        filterType() {
            if (this.column.colors) return this.column.type;

            return this.column.filter.type;
        },
        filterValue() {
            if (!this.filter) {
                if (this.isMultiSelect) return [];

                return '';
            }

            return this.filter.value;
        },
        filterParsedValue() {
            if (!this.column.filter) return '';

            if (this.filter) {
                if (Array.isArray(this.filter.value)) {
                    return this.filter.value
                        .map((val) => this.column.filter.options[val] || 'No translation')
                        .join(', ');
                }
                if (this.column.filter.options && typeof this.column.filter.options[this.filter.value] !== 'undefined') {
                    return this.column.filter.options[this.filter.value] || 'No translation';
                }

                return this.filter.value;
            }

            if (this.options) return 'Select...';

            return 'Search...';
        },
        options() {
            const { filter } = this.column;
            if (!filter || !filter.options) return null;

            const { options } = filter;
            const optionKeys = Object.keys(options);

            return optionKeys.map((key) => ({ key, value: options[key] }));
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
    },
    methods: {
        onEdit() {
            if (this.column.type !== 'CHECK') {
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, { column: this.columnIndex, row: this.rowIndex });
            }
        },
        onDismissEditDialog() {
            this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, {});
        },
        onUpdateFilter(value) {
            const { id } = this.column;

            if (this.gridState.filters[id] !== value) {
                this.$store.dispatch(`${this.namespace}/setFilter`, { id, filter: value, operator: FILTER_OPERATOR.EQUAL });
                this.$store.dispatch(`${this.namespace}/getData`, { path: this.path });
                this.$store.dispatch(`${this.namespace}/setCurrentPage`, 1);
            }
        },
    },
};
</script>
