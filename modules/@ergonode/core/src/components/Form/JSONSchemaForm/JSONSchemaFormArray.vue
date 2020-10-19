/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="arrayComponent"
        :value="value"
        :schema="schema"
        :errors="errors"
        @input="onValueChange" />
</template>

<script>
import FormSubsection from '@Core/components/Form/Subsection/FormSubsection';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaFormArray',
    components: {
        FormSubsection,
    },
    props: {
        /**
         * JSON schema
         */
        schema: {
            type: Object,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: Array,
            default: () => [],
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            arrayComponent: null,
        };
    },
    created() {
        this.arrayComponent = () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaFormArray${toCapitalize(this.schema.items.type)}`);
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                key: this.$vnode.key,
                value,
            });
        },
    },
};
</script>
