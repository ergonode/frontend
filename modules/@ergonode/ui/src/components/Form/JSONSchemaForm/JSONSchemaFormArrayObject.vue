/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSubsection
        :title="schema.title"
        :required="schema.isRequired">
        <JSONSchemaFormTableRowWidget
            v-for="(row, index) in rowValues"
            :key="index"
            :index="index"
            :value="row"
            :schema="schema.items"
            :disabled="schema.disabled"
            :errors="errors[`element-${index}`]"
            @remove="onRemoveRowAtIndex"
            @input="onValueChangeAtIndex" />
        <Button
            ref="addSectionButton"
            title="ADD NEXT"
            :disabled="schema.disabled"
            :size="smallSize"
            :theme="secondaryTheme"
            @click.native="onAddRow">
            <template #prepend="{ color }">
                <IconAdd :fill-color="color" />
            </template>
        </Button>
    </FormSubsection>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import JSONSchemaFormTableRowWidget from '@UI/components/Form/JSONSchemaForm/JSONSchemaFormTableRowWidget';

export default {
    name: 'JSONSchemaFormArrayObject',
    components: {
        JSONSchemaFormTableRowWidget,
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
            rowValues: this.value,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onAddRow() {
            this.$refs.addSectionButton.$el.scrollIntoView(true);
            this.rowValues.push({});
        },
        onRemoveRowAtIndex(index) {
            this.rowValues.splice(index, 1);
            this.$emit('input', this.rowValues);
        },
        onValueChangeAtIndex({
            index,
            value,
        }) {
            this.rowValues[index] = value;
            this.rowValues = [
                ...this.rowValues,
            ];

            this.$emit('input', this.rowValues);
        },
    },
};
</script>
