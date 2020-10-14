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
        <IconArrowDropDown
            view-box="0 0 24 24"
            :width="32" />
    </GridTableCell>
</template>

<script>
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import gridDataFilterCellMixin from '@Core/mixins/grid/cell/gridDataFilterCellMixin';

export default {
    name: 'GridSelectFilterDataCell',
    components: {
        GridFilterPresentationCell,
        IconArrowDropDown,
    },
    mixins: [
        gridDataFilterCellMixin,
    ],
    props: {
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
            if (typeof this.value[FILTER_OPERATOR.EQUAL] === 'undefined'
                || this.value[FILTER_OPERATOR.EQUAL] === '') {
                return '';
            }

            const option = this.options[this.value[FILTER_OPERATOR.EQUAL]];

            return option.label || `#${this.options[option].code}`;
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
