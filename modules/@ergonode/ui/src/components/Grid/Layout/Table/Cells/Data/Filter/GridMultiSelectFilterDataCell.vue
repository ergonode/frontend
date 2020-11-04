/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        @edit="onEditCell">
        <GridFilterPresentationCell
            placeholder="Select..."
            :value="presentationValue" />
        <IconArrowDropdown
            view-box="0 0 24 24"
            :width="32" />
    </GridTableCell>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import GridFilterPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import IconArrowDropdown from '@UI/components/Icons/Arrows/IconArrowDropdown';
import gridDataFilterCellMixin from '@UI/mixins/grid/gridDataFilterCellMixin';

export default {
    name: 'GridMultiSelectFilterDataCell',
    components: {
        GridFilterPresentationCell,
        IconArrowDropdown,
    },
    mixins: [
        gridDataFilterCellMixin,
    ],
    props: {
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            default: 'EN',
        },
    },
    computed: {
        options() {
            if (this.data.options && !Array.isArray(this.data.options)) {
                return this.data.options;
            }

            return {};
        },
        presentationValue() {
            if (!this.value[FILTER_OPERATOR.EQUAL]) {
                return '';
            }

            return this.value[FILTER_OPERATOR.EQUAL]
                .map(option => this.options[option].label || `#${this.options[option].code}`)
                .join(', ');
        },
    },
    methods: {
        onEditCell() {
            this.$emit('edit-filter-cell', {
                type: this.data.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.value,
                    columnId: this.columnId,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    options: this.options,
                    languageCode: this.languageCode,
                },
            });
        },
    },
};
</script>
