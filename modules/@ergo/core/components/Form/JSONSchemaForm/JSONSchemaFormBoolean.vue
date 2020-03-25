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
        this.localValue = this.$attrs.default;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;
            this.$emit('input', { key: this.$attrs.propKey, value });
        },
    },
};
</script>
