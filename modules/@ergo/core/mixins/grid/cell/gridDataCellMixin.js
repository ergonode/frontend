/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import {
    mapActions,
    mapState,
} from 'vuex';

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
            type: [
                String,
                Number,
            ],
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
        ...mapActions('grid', [
            'setDraftValue',
        ]),
        onCopyValues(payload) {
            this.$emit('copyCells', {
                ...payload,
                value: this.cellData.value,
                rowId: this.rowId,
                columnId: this.column.id,
            });
        },
        onValueChange(value) {
            const payload = {
                value,
                rowId: this.rowId,
                columnId: this.column.id,
            };

            this.setDraftValue(payload);

            this.$emit('editCell', payload);
        },
    },
};
