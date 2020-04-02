/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CheckBox
        :value="localValue"
        :label="$attrs.label"
        @input="onValueChange" />
</template>

<script>
import CheckBox from '@Core/components/Inputs/CheckBox';

export default {
    name: 'JSONSchemaFormBoolean',
    components: {
        CheckBox,
    },
    inheritAttrs: false,
    data() {
        return {
            localValue: false,
        };
    },
    created() {
        this.localValue = this.$attrs.value;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;

            if (this.$vnode.key) {
                this.$emit('input', { key: this.$vnode.key, value });
            } else {
                this.$emit('input', value);
            }
        },
    },
};
</script>
