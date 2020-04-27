/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState } from 'vuex';
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
            type: [String, Number],
            required: true,
        },
        editKeyCode: {
            type: Number,
            default: 13,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        isCopyable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        errorMessages() {
            return this.validationErrors[`${this.rowId}/${this.column.id}`];
        },
    },
    methods: {
        onCopyValues(payload) {
            this.$emit('copyCells', {
                ...payload,
                value: this.cellData.value,
                rowId: this.rowId,
                columnId: this.column.id,
            });
        },
        onValueChange(value) {
            this.$emit('editCell', {
                value,
                rowId: this.rowId,
                columnId: this.column.id,
            });
        },
    },
};
