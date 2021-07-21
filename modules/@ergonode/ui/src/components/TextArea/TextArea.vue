/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputUUIDProvider>
        <template #default="{ uuid }">
            <Component
                :is="styleComponent"
                ref="activator"
                :focused="isFocused"
                :error="isError"
                :data-cy="dataCy"
                :disabled="disabled"
                :alignment="alignment"
                :size="size"
                :details-label="informationLabel"
                @mousedown="onMouseDown"
                @mouseup="onMouseUp">
                <template #activator>
                    <InputController>
                        <!--
                            @slot Prepend element - icon recommended
                        -->
                        <slot name="prepend" />
                        <textarea
                            :id="uuid"
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
                            :for="uuid"
                            :required="required"
                            :size="size"
                            :floating="isFocused || !isEmpty"
                            :focused="isFocused"
                            :disabled="disabled"
                            :error="isError"
                            :label="label" />
                        <!--
                            @slot Append element - icon recommended
                        -->
                        <slot name="append" />
                        <ErrorHint
                            v-if="isError"
                            :hint="errorMessages" />
                    </InputController>
                </template>
                <template #details>
                    <!--
                        @slot Details element - text recommended
                    -->
                    <slot name="details" />
                </template>
            </Component>
        </template>
    </InputUUIDProvider>
</template>

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import InputUnderlineStyle from '@UI/components/Input/InputUnderlineStyle';

/**
 * `TextArea` is a default textarea input component.
 *  It might be configured with `prepend` and `append` slots.
 */
export default {
    name: 'TextArea',
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
                height: this.height,
                resize: this.resize,
            };
        },
        styleComponent() {
            if (this.type === INPUT_TYPE.SOLID) {
                return InputSolidStyle;
            }

            return InputUnderlineStyle;
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
    mounted() {
        if (this.autofocus) {
            this.$refs.input.focus();
        }
    },
    methods: {
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
        padding: 2px 4px;
        margin: 0;
        background-color: transparent;
        color: $GRAPHITE_DARK;

        &::placeholder {
            opacity: 0.4;
            color: $GRAPHITE_DARK;
        }

        &:disabled {
            color: $GRAPHITE;
            cursor: not-allowed;
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
