/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSelectBase
        :value="value"
        :solid="solid"
        :underline="underline"
        :left-alignment="leftAlignment"
        :center-alignment="centerAlignment"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errorMessages"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
        :dismissible="dismissible"
        :small="small"
        :regular="regular"
        :fixed-select-content="false"
        clearable
        @focus="onFocus"
        @clear="emitValue">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <input
            slot="input"
            :style="{backgroundColor: value}"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-label="label || 'no description'"
            type="text"
            readonly>
        <template #append>
            <slot name="append" />
        </template>
        <template #selectContent>
            <slot name="selectContent">
                <ColorPickerContent
                    :value="value"
                    :options="options"
                    @input="emitValue" />
            </slot>
        </template>
    </InputSelectBase>
</template>

<script>
import { Colors } from '~/model/inputs/Colors';
import InputSelectBase from '~/components/Inputs/InputSelectBase';

export default {
    name: 'ColorPicker',
    components: {
        InputSelectBase,
        ColorPickerContent: () => import('~/components/Inputs/Color/ColorPickerContent'),
    },
    props: {
        value: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            default: () => Colors,
        },
        solid: {
            type: Boolean,
            default: false,
        },
        underline: {
            type: Boolean,
            default: false,
        },
        leftAlignment: {
            type: Boolean,
            default: false,
        },
        centerAlignment: {
            type: Boolean,
            default: false,
        },
        dismissible: {
            type: Boolean,
            default: true,
        },
        label: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        hint: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        regular: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        emitValue(color) {
            this.$emit('input', color);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
