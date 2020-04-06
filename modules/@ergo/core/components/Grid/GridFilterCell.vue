/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :locked="!isFilterCell"
        :row="rowIndex"
        :column="columnIndex"
        :disabled="disabled">
        <template #default="{ isEditing }">
            <Component
                :is="infoComponent"
                v-if="!isEditing"
                :value="filterParsedValue" />
            <GridEditActivatorCell v-else>
                <GridEditFilterCell
                    :multiselect="isMultiSelect"
                    :type="filterType"
                    :value="filterValue"
                    :options="options"
                    :parameters="column.parameters"
                    :colors="column.colors || null"
                    :fixed-width="$el.offsetWidth"
                    :fixed-height="$el.offsetHeight"
                    @focus="onFocus"
                    @updateValue="onUpdateFilter" />
            </GridEditActivatorCell>
        </template>
    </GridCell>
</template>

<script>
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import { COLUMN_FILTER_TYPE } from '@Core/defaults/grid';
import { getMappedGridColumnOptions } from '@Core/models/mappers/gridDataMapper';
import { isArrayEqualToArray } from '@Core/models/arrayWrapper';

export default {
    name: 'GridFilterCell',
    inject: ['setEditingCellCoordinates'],
    components: {
        GridCell: () => import('@Core/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('@Core/components/Grid/EditCells/GridEditActivatorCell'),
        GridEditFilterCell: () => import('@Core/components/Grid/EditCells/GridEditFilterCell'),
    },
    props: {
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
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isFilterCell() {
            return typeof this.column.filter !== 'undefined';
        },
        isSelectKind() {
            const { filter } = this.column;

            if (!filter) return false;
            const { type } = filter;

            return type === COLUMN_FILTER_TYPE.SELECT || type === COLUMN_FILTER_TYPE.MULTI_SELECT;
        },
        isMultiSelect() {
            const { filter: { type } } = this.column;

            return type === COLUMN_FILTER_TYPE.MULTI_SELECT;
        },
        isSelect() {
            const { filter: { type } } = this.column;

            return type === COLUMN_FILTER_TYPE.SELECT;
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
                return getMappedGridColumnOptions(
                    this.filter.value,
                    this.column.filter.options,
                    this.column.language,
                ).editValue;
            }

            return this.filter.value;
        },
        filterParsedValue() {
            if (!this.column.filter || !this.filter) return '';

            if (Array.isArray(this.filter.value)) {
                return this.filter.value
                    .map(val => this.column.filter.options[val] || `#${val}`)
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

            return optionKeys.map(key => ({
                id: key, key, value: options[key], hint: options[key] ? `#${key} ${this.column.language}` : '',
            }));
        },
        infoComponent() {
            const { filter } = this.column;
            const type = !filter ? this.column.type : filter.type;

            switch (type) {
            case COLUMN_FILTER_TYPE.SELECT:
            case COLUMN_FILTER_TYPE.MULTI_SELECT:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationFilterSelectCell');
            default:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationFilterCell');
            }
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                this.setEditingCellCoordinates();
                this.$el.focus();
            }
        },
        onUpdateFilter(value) {
            const { id } = this.column;
            let parsedValue = value;

            if (Array.isArray(value)) {
                parsedValue = value.map(val => val.key);
            } else if (typeof value === 'object') {
                parsedValue = value.key;
            }

            if ((this.filter
                && ((Array.isArray(this.filter.value)
                    && !isArrayEqualToArray(this.filter.value, parsedValue))
                    || this.filter.value !== parsedValue))
                || (!this.filter && parsedValue.length > 0)) {
                this.$emit('filter', {
                    id,
                    value: parsedValue,
                    operator: FILTER_OPERATOR.EQUAL,
                });
            }
        },
    },
};
</script>
