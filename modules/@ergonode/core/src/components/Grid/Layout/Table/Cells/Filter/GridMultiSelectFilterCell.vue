/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :disabled="isDisabled"
        @edit="onEditCell">
        <GridFilterPresentationCell
            placeholder="Select..."
            :value="presentationValue" />
        <IconArrowDropDown
            v-if="!isLocked"
            view-box="0 0 24 24"
            :width="32" />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export default {
    name: 'GridMultiSelectFilterCell',
    components: {
        GridFilterPresentationCell,
        IconArrowDropDown,
        GridTableCell,
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
        data: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: 'EN',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            value: [],
        };
    },
    computed: {
        options() {
            if (this.data.options && !Array.isArray(this.data.options)) {
                return this.data.options;
            }

            return {};
        },
        presentationValue() {
            return this.value
                .map(option => this.options[option].label || `#${this.options[option].code}`)
                .join(', ');
        },
    },
    methods: {
        onEditCell() {
            this.$emit('editCell', {
                row: this.rowIndex,
                column: this.columnIndex,
                type: 'MULTI_SELECT',
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    options: this.options,
                    languageCode: this.languageCode,
                    onValueChange: this.onValueChange,
                },
            });
        },
        onValueChange(value) {
            this.value = value;

            this.$emit('filter', {
                index: this.columnIndex,
                value: {
                    [FILTER_OPERATOR.EQUAL]: value,
                },
            });
        },
    },
};
</script>
