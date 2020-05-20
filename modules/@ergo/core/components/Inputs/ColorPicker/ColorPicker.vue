/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <Select
        v-bind="$attrs"
        v-on="$listeners">
        <template #value>
            <span
                :style="{ color: $attrs.value }"
                v-text="$attrs.value" />
        </template>
        <template #dropdown>
            <ColorPickerContent
                :value="$attrs.value"
                :options="$attrs.options"
                @input="onSelectValue" />
        </template>
        <template #footer="{ clear, apply }">
            <DropDownFooter
                :small="$attrs.small"
                :space-between="true">
                <Button
                    :size="tinySize"
                    title="OK"
                    @click.native="apply" />
                <Button
                    :size="tinySize"
                    title="CLEAR"
                    :theme="secondaryTheme"
                    @click.native="clear" />
            </DropDownFooter>
        </template>
    </Select>
</template>


<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import Select from '@Core/components/Inputs/Select/Select';

export default {
    name: 'ColorPicker',
    components: {
        Select,
        ColorPickerContent: () => import('@Core/components/Inputs/ColorPicker/ColorPickerContent'),
        DropDownFooter: () => import('@Core/components/Inputs/Select/DropDown/Footers/DropDownFooter'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onSelectValue(value) {
            this.$emit('input', value);
        },
    },
};
</script>
