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
            <textarea
                :id="associatedLabel"
                ref="input"
                :style="textareaStyle"
                :value="value"
                :placeholder="placeholderValue"
                :autofocus="autofocus"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                @input="onValueChange"
                @focus="onFocus"
                @blur="onBlur" />
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                :style="floatingLabelTransforms"
                v-text="label" />
            <div
                v-if="isAppendSlotVisible"
                class="input__append">
                <slot name="append" />
                <ErrorHint
                    v-if="isError"
                    size="14"
                    :hint="informationLabel" />
                <InfoHint
                    v-if="isDescription"
                    :hint="description" />
            </div>
        </div>
        <label
            v-if="informationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>
import inputMixin from '@Core/mixins/inputs/inputMixin';

export default {
    name: 'TextArea',
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
    @import "@Core/assets/scss/input/input.scss";
</style>
