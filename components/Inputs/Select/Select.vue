/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSelectBase
        :value="parsedInputValue"
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
        :multiselect="multiselect"
        :clearable="clearable"
        :small="small"
        :regular="regular"
        @focus="onFocus"
        @clear="emitValue">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #input>
            <input
                :value="parsedInputValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                type="text"
                readonly>
        </template>
        <template #append>
            <slot name="append" />
        </template>
        <template #selectContent>
            <slot name="selectContent">
                <MultiselectListContent
                    v-if="multiselect"
                    :options="options"
                    :selected-options="selectedOptions"
                    @values="emitValue" />
                <SelectListContent
                    v-else
                    :options="options"
                    :selected-option="String(value)"
                    @value="emitValue" />
            </slot>
        </template>
    </InputSelectBase>
</template>

<script>
import InputSelectBase from '~/components/Inputs/InputSelectBase';

export default {
    name: 'Select',
    components: {
        InputSelectBase,
        MultiselectListContent: () => import('~/components/Inputs/Select/Contents/MultiselectListContent'),
        SelectListContent: () => import('~/components/Inputs/Select/Contents/SelectListContent'),
    },
    props: {
        value: {
            type: [Array, String, Number],
            default: null,
        },
        options: {
            type: Array,
            default: () => [],
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
        clearable: {
            type: Boolean,
            default: false,
        },
        multiselect: {
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
        selectedOptions() {
            return this.value ? this.value : [];
        },
        parsedInputValue() {
            return Array.isArray(this.value) ? this.value.join(', ') : this.value;
        },
    },
    methods: {
        emitValue(value) {
            this.$emit('input', value);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
