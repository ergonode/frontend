/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="styleComponent"
        ref="activator"
        :focused="isFocused"
        :error="isError"
        :data-cy="dataCy"
        :disabled="disabled"
        :alignment="alignment"
        :size="size"
        :height="height"
        :details-label="informationLabel"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mounted="onMounted">
        <template #activator>
            <InputController
                ref="activator"
                :size="size">
                <!--
                    @slot Prepend element - icon recommended
                -->
                <slot name="prepend" />
                <input
                    :id="associatedLabel"
                    :class="classes"
                    ref="input"
                    v-bind="{ ...input }"
                    :value="value"
                    :placeholder="placeholderValue"
                    autocomplete="on"
                    :disabled="disabled"
                    :aria-label="label || 'no description'"
                    @input="onValueChange"
                    @focus="onFocus"
                    @blur="onBlur">
                <InputLabel
                    v-if="label"
                    :for="associatedLabel"
                    :required="required"
                    :size="size"
                    :floating="isFocused || !isEmpty"
                    :focused="isFocused"
                    :disabled="disabled"
                    :error="isError"
                    :label="label" />
                <template #append>
                    <!--
                        @slot Append element - icon recommended
                    -->
                    <slot name="append" />
                    <ErrorHint
                        v-if="isError"
                        :hint="errorMessages" />
                </template>
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

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import associatedLabelMixin from '@UI/mixins/inputs/associatedLabelMixin';

/**
 * `TextField` is a default text input component.
 *  It might be configured with `prepend` and `append` slots.
 */
export default {
    name: 'TextField',
    components: {
        InputController,
        InputLabel,
        ErrorHint: () => import('@UI/components/Hints/ErrorHint'),
    },
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        /**
         * The input HTML attributes
         */
        input: {
            type: Object,
            default: () => ({
                type: 'text',
            }),
        },
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
        height() {
            return this.size === SIZE.SMALL
                ? '32px'
                : '40px';
        },
        classes() {
            return [
                'text-field',
                `text-field--${this.size}`,
                `text-field--${this.alignment}`,
            ];
        },
        styleComponent() {
            return () => import(`@UI/components/Input/Input${toCapitalize(this.type)}Style`);
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
    .text-field {
        z-index: $Z_INDEX_LVL_2;
        flex: 1;
        outline: none;
        width: 100%;
        max-width: 100%;
        min-width: 0;
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
