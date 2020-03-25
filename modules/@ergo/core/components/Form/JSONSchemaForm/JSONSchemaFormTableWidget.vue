/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection>
        <FormSubsection>
            <JSONSchemaFormTableRowWidget
                v-for="(rowValue, index) in rowValues"
                :key="index"
                :index="index"
                :properties="$attrs.properties"
                :required="$attrs.required"
                @remove="onRemoveRowAtIndex"
                @input="onValueChangeAtIndex" />
        </FormSubsection>
        <Button
            ref="addSectionButton"
            title="ADD NEXT"
            :size="smallSize"
            :theme="secondaryTheme"
            @click.native="onAddRow">
            <template #prepend="{ color }">
                <IconAdd :fill-color="color" />
            </template>
        </Button>
    </FormSection>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import FormSection from '@Core/components/Form/FormSection';
import FormSubsection from '@Core/components/Form/FormSubsection';
import JSONSchemaFormTableRowWidget from '@Core/components/Form/JSONSchemaForm/JSONSchemaFormTableRowWidget';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'JSONSchemaFormTableWidget',
    components: {
        FormSection,
        FormSubsection,
        JSONSchemaFormTableRowWidget,
        IconAdd,
        Button,
    },
    inheritAttrs: false,
    data() {
        return {
            rowValues: [{}],
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
        },
        onValueChangeAtIndex({ index, value }) {
            this.rowValues[index] = value;
            this.$emit('input', this.rowValues);
        },
    },
};
</script>
