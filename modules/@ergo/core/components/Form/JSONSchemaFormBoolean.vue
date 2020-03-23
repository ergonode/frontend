/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="booleanComponent"
        :label="title" />
</template>

<script>
export default {
    name: 'JSONSchemaFormBoolean',
    props: {
        title: {
            type: String,
            default: '',
        },
        widget: {
            type: String,
            default: '',
        },
        default: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localValue: false,
        };
    },
    computed: {
        booleanComponent() {
            switch (this.widget) {
            case 'checkbox':
                return () => import('@Core/components/Inputs/CheckBox');
            default: console.error(`Widget with type ${this.widget} is not supported`);
                return null;
            }
        },
    },
    created() {
        this.localValue = this.default;
    },
    methods: {
        onValueChange(value) {
            this.localValue = value;
            this.$emit('input', value);
        },
    },
};
</script>
