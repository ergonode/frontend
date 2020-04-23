/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="inputClasses">
        <div
            ref="activator"
            :class="activatorClasses"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot name="prepend" />
            <input
                v-test-id-generator="`input_${label}`"
                :id="associatedLabel"
                ref="input"
                :value="value"
                :placeholder="placeholderValue"
                :autofocus="autofocus"
                :type="input.type"
                :min="minRange"
                :max="maxRange"
                autocomplete="on"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                @input="onValueChange"
                @focus="onFocus"
                @blur="onBlur">
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                v-text="label" />
            <div
                v-if="isAppendSlotVisible"
                class="input__append">
                <slot name="append" />
                <ErrorHint
                    v-if="isError"
                    :hint="errorMessages" />
                <InfoHint
                    v-if="isDescription"
                    :hint="description" />
            </div>
        </div>
        <label
            v-if="informationLabel && isInformationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>
import inputMixin from '@Core/mixins/inputs/inputMixin';

export default {
    name: 'TextField',
    mixins: [inputMixin],
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
        description: {
            type: String,
            default: null,
        },
        errorMessages: {
            type: String,
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
        isInformationLabel: {
            type: Boolean,
            default: true,
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
        minRange() {
            if (this.input.type === 'number') return this.input.min;

            return null;
        },
        maxRange() {
            if (this.input === 'number') return this.input.max;

            return null;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "@Core/assets/scss/input/input.scss";
</style>
