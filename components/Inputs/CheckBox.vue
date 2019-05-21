/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        :icon="iconClass"
        size="medium"
        @click.native="onClick" />
</template>

<script>
import nestedVModelMixin from '~/mixins/nestedVModelMixin';

export default {
    name: 'CheckBox',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    mixins: [nestedVModelMixin],
    props: {
        isDisabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        iconClass() {
            if (this.isDisabled) {
                if (this.value) {
                    return 'sprite-checkbox checkbox-checked--disabled';
                }
                return 'sprite-checkbox checkbox-default--disabled';
            }

            if (Number.isInteger(this.value)) {
                // Is multi state checkbox
                switch (this.value) {
                case 0:
                    return 'sprite-checkbox checkbox-default';
                case 1:
                    return 'sprite-checkbox checkbox-checked';
                default:
                    return 'sprite-checkbox checkbox-checked-any';
                }
            }

            return this.value
                ? 'sprite-checkbox checkbox-checked'
                : 'sprite-checkbox checkbox-default';
        },
    },
    methods: {
        onClick() {
            if (!this.isDisabled) {
                if (Number.isInteger(this.value)) {
                    if (this.value === 2) {
                        this.$emit('input', 0);
                    } else {
                        this.$emit('input', this.value === 0 ? this.value + 1 : this.value - 1);
                    }
                } else {
                    this.$emit('input', !this.value);
                }
            }
        },
    },
};
</script>
