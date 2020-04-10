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
                @filter="$listeners.filter" />
        </template>
        <template
            #cell="{
                languageCode,
                data,
                dataIndex,
                columnIndex,
                rowIndex,
                rowId,
                columnId,
                isLocked,
                isCopyable,
            }">
            <GridMultiSelectDataCell
                :language-code="languageCode"
                :key="`${rowId}|${columnId}`"
                :data="data"
                :data-index="dataIndex"
                :row-id="rowId"
                :column-id="columnId"
                :column-index="columnIndex"
                :row-index="rowIndex"
                :options="options"
                :is-locked="isLocked"
                :is-copyable="isCopyable"
                @input="$listeners.editCell"
                @copy="$listeners.copyCells" />
        </template>
    </GridColumn>
</template>

<script>
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
};
</script>
