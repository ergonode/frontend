/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :draft="cellData.isDraft"
        :error="Boolean(errorMessages)"
        :edit-key-code="editKeyCode"
        :disabled="isDisabled"
        :copyable="isCopyable"
        :selected="isSelected"
        @edit="onEditCell"
        @copy="onCopyValues">
        <template v-if="cellData.value">
            <GridPresentationCell :value="presentationValue" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
            <IconArrowDropDown
                v-if="!isLocked"
                view-box="0 0 24 24"
                :width="32" />
        </template>
    </GridTableCell>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';
import {
    cellDataCompose,
} from '@Core/models/mappers/gridDataMapper';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridSelectDataCell',
    components: {
        GridPresentationCell,
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
        GridSuffixPresentationCell: () => import('@Core/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell'),
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            const check = (data, draftValue) => data !== draftValue;
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.column.id);
        },
        presentationValue() {
            const {
                value,
            } = this.cellData;

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
        ...mapActions('grid', [
            'setEditCell',
        ]),
        onEditCell() {
            this.setEditCell({
                row: this.rowIndex,
                column: this.columnIndex,
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    languageCode: this.languageCode,
                    options: this.options,
                    errorMessages: this.errorMessages,
                    onValueChange: this.onValueChange,
                },
            });
        },
    },
};
</script>
