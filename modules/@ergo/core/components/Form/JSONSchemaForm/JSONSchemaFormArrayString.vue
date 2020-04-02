/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSubsection>
        <Component
            v-for="element in enumComponents"
            :is="element.component"
            :key="element.key"
            v-bind="element.props"
            @input="onValueChange" />
    </FormSubsection>
</template>

<script>
import FormSubsection from '@Core/components/Form/FormSubsection';

export default {
    name: 'JSONSchemaFormArrayString',
    components: {
        FormSubsection,
    },
    inheritAttrs: false,
    data() {
        return {
            enumComponents: [],
            localValue: this.$attrs.value,
        };
    },
    created() {
        this.enumComponents = this.initializeComponents();
    },
    methods: {
        initializeComponents() {
            const { enum: options, enum_titles } = this.$attrs;

            if (!options && !enum_titles) return [];

            const { length } = options;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = options[i];

                components.push({
                    key,
                    props: {
                        value: this.$attrs.value
                            ? this.$attrs.value.findIndex(option => option === key) !== -1
                            : false,
                        small: true,
                        label: enum_titles[i],
                    },
                    component: () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormBoolean'),
                });
            }

            return components;
        },
        onValueChange({ key, value }) {
            if (value) {
                this.localValue.push(key);
            } else {
                const index = this.localValue.findIndex(option => option === key);

                this.localValue.splice(index);
            }

            this.$emit('input', this.localValue);
        },
    },
};
</script>
