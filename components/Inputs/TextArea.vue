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
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                :style="floatingLabelTransforms"
                v-text="label" />
            <textarea
                :id="associatedLabel"
                ref="input"
                :style="textareaStyle"
                :value="value"
                :placeholder="placeholder"
                :autofocus="autofocus"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                @input="onValueChange"
                @focus="onFocus"
                @blur="onBlur" />
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
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/input.scss";
</style>
