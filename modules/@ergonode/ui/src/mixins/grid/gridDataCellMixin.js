/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
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
        /**
         * Determinate if the component has not saved changes
         */
        isDraft: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is not being able to edit
         */
        isLocked: {
            type: Boolean,
            default: false,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is being able to copy value by mass action
         */
        isCopyable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        cellData() {
            if (this.isDraft && this.data.value !== this.draft) {
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
            this.$emit('cell-value', [
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
