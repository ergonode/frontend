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
        <textarea
            slot="input"
            :value="value"
            :placeholder="placeholder"
            :autofocus="autofocus"
            :disabled="disabled"
            :aria-label="label || 'no description'"
            :style="textareaStyle"
            @input="emitValue" />
        <template v-slot:append>
            <slot name="append" />
        </template>
    </InputBase>
</template>

<script>
import InputBase from '~/components/Inputs/InputBase';

export default {
    components: {
        InputBase,
    },
    props: {
        input: {
            type: Object,
            required: false,
            default: () => ({
                type: 'text',
            }),
        },
        value: {
            type: [String, Number],
            default: null,
        },
        dismissible: {
            type: Boolean,
            default: true,
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
        resize: {
            type: String,
            default: 'auto',
        },
    },
    computed: {
        textareaStyle() {
            return {
                resize: this.resize,
            };
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
