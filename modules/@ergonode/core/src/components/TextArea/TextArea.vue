/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="styleComponent"
        ref="activator"
        :height="height"
        :focused="isFocused"
        :error="isError"
        :data-cy="dataCy"
        :disabled="disabled"
        :alignment="alignment"
        :size="size"
        :details-label="informationLabel"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mounted="onMounted">
        <template #activator>
            <InputController :size="size">
                <slot name="prepend" />
                <textarea
                    :id="associatedLabel"
                    :style="styles"
                    :class="classes"
                    ref="input"
                    :value="value"
                    :placeholder="placeholderValue"
                    :disabled="disabled"
                    :aria-label="label || 'no description'"
                    @input="onValueChange"
                    @focus="onFocus"
                    @blur="onBlur" />
                <InputLabel
                    v-if="label"
                    :style="{ top: 0 }"
                    :for="associatedLabel"
                    :required="required"
                    :size="size"
                    :floating="isFocused || !isEmpty"
                    :focused="isFocused"
                    :disabled="disabled"
                    :error="isError"
                    :label="label" />
                <template #append>
                    <slot name="append" />
                    <ErrorHint
                        v-if="isError"
                        :hint="errorMessages" />
                </template>
            </InputController>
        </template>
        <template #details>
            <slot name="details" />
        </template>
    </Component>
</template>

<script>
import InputController from '@Core/components/Input/InputController';
import InputLabel from '@Core/components/Input/InputLabel';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import associatedLabelMixin from '@Core/mixins/inputs/associatedLabelMixin';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

/**
 * `TextArea` is a default textarea input component.
 *  It might be configured with `prepend` and `append` slots.
 */
export default {
    name: 'TextArea',
    components: {
        InputController,
        InputLabel,
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
    },
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Height of the component
         */
        height: {
            type: String,
            default: 'unset',
        },
        /**
         * Alignment of selected value, might be centered or from left
         */
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        /**
         * Determines style of component based on type
         */
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        /**
         * Component value
         */
        value: {
            type: [
                String,
                Number,
            ],
            default: null,
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * The placeholder is a helper text for the component
         */
        placeholder: {
            type: String,
            default: null,
        },
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if component should be focused as it's initialised
         */
        autofocus: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines whether textarea is being able to resize
         */
        resize: {
            type: String,
            default: 'auto',
        },
        /**
         * Unique identifier for cypress
         */
        dataCy: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isFocused: false,
            isMouseMoving: false,
        };
    },
    computed: {
        classes() {
            return [
                'textarea',
                `textarea--${this.size}`,
                `textarea--${this.alignment}`,
            ];
        },
        styles() {
            return {
                resize: this.resize,
            };
        },
        styleComponent() {
            return () => import(`@Core/components/Input/Input${toCapitalize(this.type)}Style`);
        },
        isEmpty() {
            return this.value === '' || this.value === null;
        },
        isError() {
            return Boolean(this.errorMessages);
        },
        informationLabel() {
            return this.errorMessages || this.hint;
        },
        placeholderValue() {
            if (this.value || (this.label && !this.isFocused)) return null;

            return this.placeholder;
        },
    },
    methods: {
        onMounted() {
            if (this.autofocus) {
                this.$nextTick(() => {
                    window.requestAnimationFrame(() => {
                        this.$refs.input.focus();
                    });
                });
            }
        },
        onValueChange(event) {
            this.$emit('input', event.target.value);
        },
        onFocus() {
            this.isFocused = true;

            this.$emit('focus', true);
        },
        onBlur() {
            this.isFocused = false;

            this.$emit('focus', false);
        },
        onMouseDown(event) {
            this.$refs.activator.$el.addEventListener('mousemove', this.onMouseMove);

            const isClickedInsideInput = event.target === this.$refs.input;

            if (!isClickedInsideInput) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseUp() {
            this.$refs.activator.$el.removeEventListener('mousemove', this.onMouseMove);

            // Manual handling of input focus
            if (!this.isMouseMoving) {
                this.$refs.input.focus();
            }

            this.isMouseMoving = false;
        },
        onMouseMove() {
            this.isMouseMoving = true;
        },
    },
};
</script>

<style lang="scss" scoped>
    .textarea {
        z-index: $Z_INDEX_LVL_2;
        flex: 1;
        outline: none;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        height: 100%;
        border: none;
        padding: 0;
        background-color: transparent;
        color: $GRAPHITE_DARK;

        &::placeholder {
            opacity: 0.4;
            color: $GRAPHITE_DARK;
        }

        &:disabled {
            color: $GRAPHITE_LIGHT;
        }

        &--small {
            font: $FONT_MEDIUM_12_16;
        }

        &--regular {
            font: $FONT_MEDIUM_14_20;
        }

        &--left {
            text-align: left;
        }

        &--center {
            text-align: center;
        }
    }
</style>
