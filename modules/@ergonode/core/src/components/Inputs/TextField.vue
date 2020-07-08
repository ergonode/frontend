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
        :details-label="informationLabel"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp">
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
                    :autofocus="autofocus"
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
import InputController from '@Core/components/Inputs/InputController';
import InputLabel from '@Core/components/Inputs/InputLabel';
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
 * `TextField` is a default text input component.
 *  It might be configured with `prepend` and `append` slots.
 */
export default {
    name: 'TextField',
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
         * The input HTML attributes
         */
        input: {
            type: Object,
            default: () => ({
                type: 'text',
            }),
        },
        /**
         * The size of the input
         * @values small, regular
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
         * The alignment of text inside input
         */
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        /**
         * The style type
         * @values solid, underline
         */
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        /**
         * The value of the input
         */
        value: {
            type: [
                String,
                Number,
            ],
            default: null,
        },
        /**
         * The floating label
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * The placeholder
         */
        placeholder: {
            type: String,
            default: null,
        },
        /**
         * The error messages
         */
        errorMessages: {
            type: String,
            default: '',
        },
        /**
         * The hint
         */
        hint: {
            type: String,
            default: '',
        },
        /**
         * The required flag
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * The autofocus flag
         */
        autofocus: {
            type: Boolean,
            default: false,
        },
        /**
         * The disabled flag
         */
        disabled: {
            type: Boolean,
            default: false,
        },
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
                'text-field',
                `text-field--${this.size}`,
                `text-field--${this.alignment}`,
            ];
        },
        styleComponent() {
            return () => import(`@Core/components/Inputs/Input${toCapitalize(this.type)}Style`);
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
            setTimeout(() => {
                this.$nextTick(() => {
                    window.requestAnimationFrame(() => {
                        this.$refs.input.focus();
                    });
                });
            }, 100);
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
