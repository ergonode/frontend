/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="inputStyle">
        <div
            ref="activator"
            :class="inputContentClasses"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot name="prepend" />
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                :style="floatingLabelTransforms"
                v-text="label" />
            <input
                :id="associatedLabel"
                ref="input"
                :value="value"
                :placeholder="placeholder"
                :autofocus="autofocus"
                :type="inputType"
                :min="minRange"
                :max="maxRange"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                @input="emitValue"
                @focus="onFocus"
                @blur="onBlur">
            <slot name="append" />
        </div>
        <label
            v-if="informationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>
import baseInputMixin from '~/mixins/inputs/baseInputMixin';

export default {
    name: 'TextField',
    mixins: [baseInputMixin],
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
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/input.scss";
</style>
