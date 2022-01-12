/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :draft="cellData.isDraft"
        :error="Boolean(errorMessages)"
        :disabled="isDisabled"
        :copyable="isCopyable"
        :selected="isSelected"
        @edit="onEditCell">
        <template v-if="cellData.value && cellData.value.length">
            <GridPresentationCell :value="presentationValue" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
            <IconArrowDropdown
                v-if="!isLocked"
                view-box="0 0 24 24"
                :width="32" />
        </template>
    </GridTableCell>
</template>

<script>
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridMultiSelectDataCell',
    components: {
        IconArrowDropdown: () => import('@UI/components/Icons/Arrows/IconArrowDropdown'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            if (this.isDraft && !arraysAreEqual(this.data.value, this.draft)) {
                return {
                    value: this.draft,
                    isDraft: true,
                };
            }

            return {
                value: this.data.value,
                isDraft: false,
            };
        },
        options() {
            if (this.column.filter
                && this.column.filter.options
                && !Array.isArray(this.column.filter.options)) {
                return this.column.filter.options;
            }

            return {};
        },
        presentationValue() {
            const {
                value,
            } = this.cellData;

            return value.map((option) => {
                if (typeof this.options[option] === 'undefined') {
                    return '';
                }

                return this.options[option].label || `#${this.options[option].code}`;
            }).join(', ');
        },
    },
    methods: {
        onEditCell() {
            this.$emit('edit-cell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect().toJSON(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    options: this.options,
                    disabled: this.isLocked,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    errorMessages: this.errorMessages,
                    languageCode: this.column.language,
                },
            });
        },
    },
};
</script>
