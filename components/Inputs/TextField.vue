/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputBase
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
        :small="small"
        :regular="regular"
        :dismissible="dismissible"
        @focus="onFocus">
        <input
            slot="input"
            :value="value"
            :placeholder="placeholder"
            :autofocus="autofocus"
            :type="inputType"
            :min="minRange"
            :max="maxRange"
            :disabled="disabled"
            :aria-label="label || 'no description'"
            @input="emitValue">
        <template #append>
            <slot name="append" />
        </template>
    </InputBase>
</template>

<script>
import InputBase from '~/components/Inputs/InputBase';

export default {
    name: 'TextField',
    components: {
        InputBase,
    },
    props: {
        input: {
            type: Object,
            default: () => ({
                type: 'text',
            }),
        },
        value: {
            type: [String, Number],
            default: null,
        },
        solid: {
            type: Boolean,
            default: false,
        },
        dismissible: {
            type: Boolean,
            default: true,
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
    computed: {
        inputType() {
            const { type } = this.input;

            return type;
        },
        minRange() {
            if (this.inputType === 'number') return this.input.min;

            return null;
        },
        maxRange() {
            if (this.inputType === 'number') return this.input.max;

            return null;
        },
    },
    methods: {
        emitValue(event) {
            this.$emit('input', event.target.value);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
