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
                    :title="$t('core.buttons.clear')"
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
import Button from '@UI/components/Button/Button';
import ColorPickerContent from '@UI/components/ColorPicker/ColorPickerContent';
import DropdownFooter from '@UI/components/Select/Dropdown/Footers/DropdownFooter';
import Select from '@UI/components/Select/Select';

export default {
    name: 'ColorPicker',
    components: {
        Select,
        ColorPickerContent,
        DropdownFooter,
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
