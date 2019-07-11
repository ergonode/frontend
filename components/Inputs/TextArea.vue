/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputBase
        :value="value"
        :append-icon="appendIcon"
        :prepend-icon="prependIcon"
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
        dismissible
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
            required: false,
            default: null,
        },
        appendIcon: {
            type: String,
            required: false,
            default: null,
        },
        prependIcon: {
            type: String,
            required: false,
            default: null,
        },
        solid: {
            type: Boolean,
            required: false,
            default: false,
        },
        underline: {
            type: Boolean,
            required: false,
            default: false,
        },
        leftAlignment: {
            type: Boolean,
            required: false,
            default: false,
        },
        centerAlignment: {
            type: Boolean,
            required: false,
            default: false,
        },
        label: {
            type: String,
            required: false,
            default: null,
        },
        placeholder: {
            type: String,
            required: false,
            default: null,
        },
        errorMessages: {
            type: [String, Array],
            required: false,
            default: '',
        },
        hint: {
            type: String,
            required: false,
            default: '',
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        autofocus: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        small: {
            type: Boolean,
            required: false,
            default: false,
        },
        regular: {
            type: Boolean,
            required: false,
            default: false,
        },
        resize: {
            type: String,
            required: false,
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
