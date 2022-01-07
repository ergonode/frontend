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
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridProductRelationDataCell',
    mixins: [
        gridDataCellMixin,
    ],
    props: {
        errorMessages: {
            type: [
                Object,
                String,
            ],
            default: '',
        },
    },
    computed: {
        cellData() {
            const isEqualArray = arraysAreEqual(this.data.value, this.draft);
            const isNotNull = this.data.value === null && this.draft === null;

            if (this.isDraft && !isEqualArray && !isNotNull) {
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
                    bounds: this.$el.getBoundingClientRect().toJSON(),
                    value: this.cellData.value,
                    row: this.rowIndex,
                    column: this.columnIndex,
                    disabled: this.isLocked,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    errorMessages: this.errorMessages,
                },
            });
        },
    },
};
</script>
