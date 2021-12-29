/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <Select
        v-bind="$attrs"
        v-on="$listeners">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #value>
            <slot name="value">
                <span v-text="$attrs.value" />
            </slot>
        </template>
        <template #append>
            <slot name="append" />
        </template>
        <template
            #dropdown="{
                onSelectValue,
                onClear,
                onApply
            }">
            <ColorPickerContent
                :value="$attrs.value"
                :options="$attrs.options"
                @input="onSelectValue" />
            <DropdownFooter
                :size="$attrs.size"
                :space-between="true">
                <Button
                    :size="tinySize"
                    title="OK"
                    @click.native="onApply" />
                <Button
                    :size="tinySize"
                    :title="$t('@Core._.buttons.clear')"
                    :theme="secondaryTheme"
                    @click.native="onClear" />
            </DropdownFooter>
        </template>
    </Select>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ColorPickerContent from '@UI/components/ColorPicker/ColorPickerContent';
import DropdownFooter from '@UI/components/Select/Dropdown/Footers/DropdownFooter';

export default {
    name: 'ColorPicker',
    components: {
        ColorPickerContent,
        DropdownFooter,

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
