/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridColumn
        v-bind="$attrs"
        v-on="$listeners">
        <template
            #filter="{
                columnIndex,
                isLocked,
                rowIndex,
                filter,
                languageCode,
            }">
            <GridMultiSelectFilterCell
                :is-locked="isLocked"
                :filter="filter"
                :options="options"
                :language-code="languageCode"
                :column-index="columnIndex"
                :row-index="rowIndex"
                @filter="onFilterChange" />
        </template>
        <template
            #cell="{
                data,
                languageCode,
                columnIndex,
                rowIndex,
                rowId,
                isLocked,
                isCopyable,
            }">
            <GridMultiSelectDataCell
                :key="rowId"
                :data="data"
                :options="options"
                :language-code="languageCode"
                :column-index="columnIndex"
                :row-index="rowIndex"
                :is-locked="isLocked"
                :is-copyable="isCopyable" />
        </template>
    </GridColumn>
</template>

<script>
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import GridColumn from '@Core/components/Grid/Layout/Table/Columns/GridColumn';
import GridMultiSelectDataCell from '@Core/components/Grid/Layout/Table/Cells/Data/GridMultiSelectDataCell';

export default {
    name: 'GridMultiSelectColumn',
    components: {
        GridColumn,
        GridMultiSelectDataCell,
        GridMultiSelectFilterCell: () => import('@Core/components/Grid/Layout/Table/Cells/Filter/GridMultiSelectFilterCell'),
    },
    inheritAttrs: false,
    computed: {
        options() {
            if (this.$attrs.column.filter
                && this.$attrs.column.filter.options) {
                // TODO: BE has to unify types!
                if (Array.isArray(this.$attrs.column.filter.options)) return {};

                return this.$attrs.column.filter.options;
            }

            return {};
        },
    },
    methods: {
        onFilterChange(value) {
            this.$emit('filter', {
                id: this.$attrs.column.id,
                value,
                operator: FILTER_OPERATOR.EQUAL,
            });
        },
    },
};
</script>
