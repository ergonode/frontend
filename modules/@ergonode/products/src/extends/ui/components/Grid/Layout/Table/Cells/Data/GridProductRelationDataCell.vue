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
        <template v-if="presentationValue">
            <GridPresentationCell :value="presentationValue" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import GridPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import GridSuffixPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridSuffixPresentationCell';
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridProductRelationDataCell',
    components: {
        GridPresentationCell,
        GridSuffixPresentationCell,
    },
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            if (this.isDraft && !arraysAreEqual(this.data.value || [], this.draft)) {
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
        presentationValue() {
            if (!this.cellData.value || !this.cellData.value.length) {
                return '';
            }

            const {
                length,
            } = this.cellData.value;

            if (length === 1) {
                return this.$t('@Products.uiExtend.components.GridProductRelationDataCell.singularLabel', {
                    info: length,
                });
            }

            return this.$t('@Products.uiExtend.components.GridProductRelationDataCell.pluralLabel', {
                info: length,
            });
        },
    },
    methods: {
        onEditCell() {
            this.$emit('edit-cell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    disabled: this.isLocked,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    attributeId: this.column.element_id,
                    errorMessages: this.errorMessages,
                },
            });
        },
    },
};
</script>
