/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    props: {
        value: {
            type: [Array, Object, String, Number, Boolean],
            required: false,
            default: null,
        },
    },
    computed: {
        internalValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
