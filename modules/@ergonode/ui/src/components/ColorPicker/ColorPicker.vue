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
        <template #dropdown="{ onSelectValueCallback }">
            <ColorPickerContent
                :value="$attrs.value"
                :options="$attrs.options"
                @input="onSelectValueCallback" />
        </template>
        <template #footer="{ clear, apply }">
            <DropDownFooter
                :size="$attrs.size"
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
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import ColorPickerContent from '@UI/components/ColorPicker/ColorPickerContent';
import DropDownFooter from '@UI/components/Select/DropDown/Footers/DropDownFooter';
import Select from '@UI/components/Select/Select';

export default {
    name: 'ColorPicker',
    components: {
        Select,
        ColorPickerContent,
        DropDownFooter,
        Button,
    },
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
};
</script>
