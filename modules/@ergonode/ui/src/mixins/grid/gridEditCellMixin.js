/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    props: {
        value: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        bounds: {
            type: [
                DOMRect,
                Object,
            ],
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        column: {
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
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
    },
    data() {
        return {
            localValue: this.value,
        };
    },
    computed: {
        /**
         * @deprecated since 1.2.0 - replaced by GridEditContentCell
         */
        positionStyle() {
            const {
                x,
                y,
                width,
                height,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: `${width}px`,
                minHeight: `${height}px`,
            };
        },
    },
    methods: {
        onEditCell() {
            this.$emit('dismiss');
        },
    },
};
