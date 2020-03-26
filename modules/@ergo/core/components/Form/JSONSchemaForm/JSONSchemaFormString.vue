/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="stringComponent"
        v-bind="$attrs"
        v-on="$listeners" />
</template>

<script>

export default {
    name: 'JSONSchemaFormString',
    inheritAttrs: false,
    data() {
        return {
            stringComponent: null,
        };
    },
    created() {
        const { enum: options } = this.$attrs;

        if (options) this.stringComponent = () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormSelect');
        else this.stringComponent = () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormText');
    },
};
</script>
