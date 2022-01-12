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
        <template v-if="cellData.value">
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
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridSelectDataCell',
    components: {
        IconArrowDropdown: () => import('@UI/components/Icons/Arrows/IconArrowDropdown'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        presentationValue() {
            const {
                value,
            } = this.cellData;

            if (typeof this.options[value] === 'undefined') {
                return '';
            }

            return this.options[value].label
            || `#${this.options[value].code}`;
        },
        options() {
            if (this.column.filter
                && this.column.filter.options
                && !Array.isArray(this.column.filter.options)) {
                return this.column.filter.options;
            }

            return {};
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
