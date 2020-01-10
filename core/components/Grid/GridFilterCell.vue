/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :locked="!isFilterCell"
        :row="rowIndex"
        :column="columnIndex"
        :disabled="disabled"
        :spacebar-edition="false">
        <template #default="{ isEditing }">
            <Component
                :is="infoComponent"
                v-if="!isEditing"
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
        </template>
    </GridCell>
</template>

<script>
import { FILTER_OPERATOR } from '~/defaults/operators';
import { COLUMN_TYPE } from '~/defaults/grid';
import { getMappedArrayValue } from '~/model/mappers/gridDataMapper';
import { isArrayEqualToArray } from '~/model/arrayWrapper';

export default {
    name: 'GridFilterCell',
    inject: ['setEditingCellCoordinates'],
    components: {
        GridCell: () => import('~/core/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('~/core/components/Grid/EditCells/GridEditActivatorCell'),
        GridEditFilterCell: () => import('~/core/components/Grid/EditCells/GridEditFilterCell'),
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

            return optionKeys.map((key) => ({
                id: key, key, value: options[key], hint: options[key] ? `#${key} ${this.column.language}` : '',
            }));
        },
        infoComponent() {
            const { filter } = this.column;
            const type = !filter ? this.column.type : filter.type;

            switch (type) {
            case COLUMN_TYPE.SELECT:
            case COLUMN_TYPE.MULTI_SELECT:
                return () => import('~/core/components/Grid/PresentationCells/GridPresentationFilterSelectCell');
            default:
                return () => import('~/core/components/Grid/PresentationCells/GridPresentationFilterCell');
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
                parsedValue = value.map((val) => val.key);
            } else if (typeof value === 'object') {
                parsedValue = value.key;
            }

            if (((this.filter
                && ((Array.isArray(this.filter.value)
                    && !isArrayEqualToArray(this.filter.value, parsedValue))
                    || this.filter.value !== parsedValue)))
                || (!this.filter && parsedValue.length > 0)) {
                this.$emit('filter', {
                    id,
                    filter: parsedValue,
                    operator: FILTER_OPERATOR.EQUAL,
                });
            }
        },
    },
};
</script>
