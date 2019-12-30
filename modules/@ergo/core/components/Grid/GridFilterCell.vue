/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :editing-allowed="isFilterCell"
        :row="rowIndex"
        :column="columnIndex"
        :action-cell="false"
        :editing="isEditingCell"
        @edit="onEdit">
        <Component
            :is="infoComponent"
            v-if="!isEditingCell"
            :value="filterParsedValue" />
        <GridEditActivatorCell v-else>
            <GridEditFilterCell
                :multiselect="isMultiSelect"
                :type="filterType"
                :language-code="column.language"
                :value="filterValue"
                :options="options"
                :colors="column.colors || null"
                :fixed-width="$el.offsetWidth"
                :fixed-height="$el.offsetHeight"
                @focus="onFocus"
                @updateValue="onUpdateFilter" />
        </GridEditActivatorCell>
    </GridCell>
</template>

<script>
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import { COLUMN_TYPE } from '@Core/defaults/grid';
import { getMappedArrayValue } from '@Core/models/mappers/gridDataMapper';

export default {
    name: 'GridFilterCell',
    components: {
        GridCell: () => import('@Core/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('@Core/components/Grid/EditCells/GridEditActivatorCell'),
        GridEditFilterCell: () => import('@Core/components/Grid/EditCells/GridEditFilterCell'),
    },
    props: {
        namespace: {
            type: String,
            required: true,
        },
        rowIndex: {
            type: Number,
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
        isSelectKind() {
            const { filter } = this.column;

            if (!filter) return false;
            const { type } = filter;

            return type === COLUMN_TYPE.SELECT || type === COLUMN_TYPE.MULTI_SELECT;
        },
        isMultiSelect() {
            const { filter: { type } } = this.column;

            return type === COLUMN_TYPE.MULTI_SELECT;
        },
        isSelect() {
            const { filter: { type } } = this.column;

            return type === COLUMN_TYPE.SELECT;
        },
        filterType() {
            if (this.column.colors) return this.column.type;

            return this.column.filter.type;
        },
        filterValue() {
            if (!this.filter) {
                if (this.isMultiSelect) return [];
                if (this.isSelect) return { key: '', value: '' };

                return '';
            }

            if (this.isSelectKind) {
                return getMappedArrayValue(
                    this.filter.value,
                    this.column.filter.options,
                );
            }

            return this.filter.value;
        },
        filterParsedValue() {
            if (!this.column.filter || !this.filter) return '';

            if (Array.isArray(this.filter.value)) {
                return this.filter.value
                    .map((val) => this.column.filter.options[val] || `#${val}`)
                    .join(', ');
            }

            if (this.column.filter.options && typeof this.column.filter.options[this.filter.value] !== 'undefined') {
                return this.column.filter.options[this.filter.value] || `#${this.filter.value}`;
            }

            return this.filter.value;
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
            case COLUMN_TYPE.SELECT:
            case COLUMN_TYPE.MULTI_SELECT:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationFilterSelectCell');
            default:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationFilterCell');
            }
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, {});
                this.$el.focus();
            }
        },
        onEdit(isEditing) {
            if (isEditing) {
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, { column: this.columnIndex, row: this.rowIndex });
            } else {
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, {});
            }
        },
        onUpdateFilter(value) {
            const { id } = this.column;
            let parsedValue = value;

            if (Array.isArray(value)) {
                parsedValue = value.map((val) => val.key);
            } else if (typeof value === 'object') {
                parsedValue = value.key;
            }

            if (this.gridState.filters[id] !== parsedValue) {
                this.$store.dispatch(`${this.namespace}/setFilter`, { id, filter: parsedValue, operator: FILTER_OPERATOR.EQUAL });
                this.$store.dispatch(`${this.namespace}/getData`, this.path);
                this.$store.dispatch(`${this.namespace}/setCurrentPage`, 1);
            }
        },
    },
};
</script>
