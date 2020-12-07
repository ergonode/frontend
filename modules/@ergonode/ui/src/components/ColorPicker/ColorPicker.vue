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
            <DropdownFooter
                :size="$attrs.size"
                :space-between="true">
                <Button
                    :size="tinySize"
                    title="OK"
                    @click.native="apply" />
                <Button
                    :size="tinySize"
                    :title="$t('core.buttons.clear')"
                    :theme="secondaryTheme"
                    @click.native="clear" />
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
