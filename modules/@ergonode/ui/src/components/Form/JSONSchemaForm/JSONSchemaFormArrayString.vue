/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSubsection
        :title="schema.title"
        :required="required">
        <FormFieldset>
            <CheckBox
                v-for="title in schema.items.enum_titles"
                :key="title"
                :value="localValue"
                :disabled="schema.disabled"
                :label="title"
                @input="onValueChange" />
        </FormFieldset>
    </FormSubsection>
</template>

<script>

export default {
    name: 'JSONSchemaFormArrayString',
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
         * Determines if the given field is required
         */
        required: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localValue: this.getMappedTitles({
                key: 'enum',
                value: 'enum_titles',
                data: this.value,
            }),
        };
    },
    methods: {
        getMappedTitles({
            key, value, data,
        }) {
            const titles = [];

            for (let i = 0; i < data.length; i += 1) {
                const titleIndex = this.schema.items[key].findIndex(
                    option => option === data[i],
                );

                titles.push(this.schema.items[value][titleIndex]);
            }

            return titles;
        },
        onValueChange(value) {
            this.localValue = value;

            this.$emit('input', this.getMappedTitles({
                key: 'enum_titles',
                value: 'enum',
                data: value,
            }));
        },
    },
};
</script>
