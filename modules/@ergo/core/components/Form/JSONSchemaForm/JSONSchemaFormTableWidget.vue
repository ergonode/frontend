/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection>
        <JSONSchemaFormTableRowWidget
            v-for="(rowValue, index) in rowValues"
            :key="index"
            :properties="properties" />
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
import JSONSchemaFormTableRowWidget from '@Core/components/Form/JSONSchemaForm/JSONSchemaFormTableRowWidget';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'JSONSchemaFormTableWidget',
    components: {
        FormSection,
        JSONSchemaFormTableRowWidget,
        IconAdd,
        Button,
    },
    props: {
        properties: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            rowValues: [],
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
    created() {
        this.rowValues.push(this.getDefaultRowModel());
    },
    methods: {
        getDefaultRowModel() {
            return Object.keys(this.properties).reduce(((previousValue, currentValue) => {
                const obj = previousValue;
                obj[currentValue] = null;
                return obj;
            }), {});
        },
        onAddRow() {
            this.$refs.addSectionButton.$el.scrollIntoView(true);
            this.rowValues.push(this.getDefaultRowModel());
        },
        onValueChange(value) {
            this.rowValues = value;
            this.$emit('input', value);
        },
    },
};
</script>
