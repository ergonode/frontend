/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export default {
    props: {
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        presentationValue() {
            return this.value[FILTER_OPERATOR.EQUAL];
        },
    },
    methods: {
        onEditCell() {
            this.$emit('edit-filter-cell', {
                type: this.data.type,
                props: {
                    bounds: this.$el.getBoundingClientRect().toJSON(),
                    value: this.value,
                    columnId: this.columnId,
                    row: this.rowIndex,
                    column: this.columnIndex,
                },
            });
        },
    },
};
