/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    components: {
        GridTableCell,
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        draft: {
            default: null,
        },
        column: {
            type: Object,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        errorMessages: {
            type: String,
            default: '',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        isCopyable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        cellData() {
            if (this.draft !== null && this.data.value !== this.draft) {
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
    },
    methods: {
        onValueChange(value) {
            this.$emit('cellValue', [
                {
                    value,
                    rowId: this.rowId,
                    columnId: this.column.id,
                    row: this.rowIndex,
                    column: this.columnIndex,
                },
            ]);
        },
        onEditCell() {
            this.$emit('editCell', {
                type: this.column.type,
                props: {
                    bounds: this.$el.getBoundingClientRect(),
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
