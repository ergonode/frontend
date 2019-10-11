/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="inputStyle"
        @keyup="onKeyUp"
        @keydown="onKeyDown">
        <div
            ref="inputContent"
            :class="inputContentClasses"
            @click="onFocusInput">
            <slot name="prepend" />
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                :style="floatingLabelTransforms"
                v-text="label" />
            <slot name="input" />
            <slot name="append" />
        </div>
        <label
            v-if="informationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>

export default {
    name: 'InputBase',
    props: {
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
        small: {
            type: Boolean,
            default: false,
        },
        regular: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFocused: false,
            isMounted: false,
            associatedLabel: '',
        };
    },
    computed: {
        isEmpty() {
            return this.value === '' || this.value === null;
        },
        isFloatingLabel() {
            return this.label !== null;
        },
        isPlaceholder() {
            return this.placeholder !== null;
        },
        inputStyle() {
            return [
                'input',
                {
                    solid: this.solid,
                    underline: this.underline,
                    'left-alignment': this.leftAlignment,
                    'center-alignment': this.centerAlignment,
                    'floating-label': this.isFloatingLabel,
                    'input--error': this.isError,
                    'input--focused': this.isFocused,
                    'input--disabled': this.disabled,
                },
            ];
        },
        inputContentClasses() {
            return [
                'input__content',
                {
                    'input__content--small': this.small,
                    'input__content--regular': this.regular,
                },
            ];
        },
        informationLabelClasses() {
            const colorClass = this.isError
                ? 'txt--error'
                : 'txt--graphite';

            return [
                'input__information-label',
                'typo-hint',
                'txt-fixed',
                colorClass,
            ];
        },
        floatingLabelTransforms() {
            if (!this.isMounted) return null;

            if (this.isFocused || !this.isEmpty || this.isPlaceholder) {
                const { inputContent } = this.$refs;
                const translateX = this.solid ? '-2px' : '-5px';
                const transform = `translate(${translateX}, -${inputContent.offsetHeight / 2}px) scale(0.9)`;

                return {
                    transform,
                };
            }

            return {
                transform: 'translate(0, 0) scale(1)',
            };
        },
        floatingLabelClasses() {
            return [
                'input__label',
                { 'input__label--required': this.required },
            ];
        },
        informationLabel() {
            return this.isError ? this.parsedErrorMessages : this.hint;
        },
        isError() {
            return Boolean(Array.isArray(this.errorMessages)
                ? this.errorMessages.length
                : this.errorMessages);
        },
        parsedErrorMessages() {
            return Array.isArray(this.errorMessages)
                ? this.errorMessages.join(', ')
                : this.errorMessages;
        },
    },
    mounted() {
        if (this.autofocus) {
            this.focusInput();

            this.isFocused = true;
        }

        this.isMounted = true;
        // eslint-disable-next-line no-underscore-dangle
        this.associatedLabel = `input-${this._uid}`;
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        focusInput() {
            const input = this.$el.querySelector('input') || this.$el.querySelector('textarea');
            window.addEventListener('click', this.onClickOutside);
            input.focus();
        },
        blurInput() {
            const input = this.$el.querySelector('input') || this.$el.querySelector('textarea');
            window.removeEventListener('click', this.onClickOutside);
            input.blur();
        },
        onKeyUp(event) {
            const { keyCode } = event;
            // Tab
            if (keyCode === 9 && !this.isFocused) {
                this.isFocused = true;
                this.focusInput();
                this.$emit('focus', true);
            }
        },
        onKeyDown(event) {
            const { keyCode } = event;

            // Tab
            if (keyCode === 9 && this.isFocused) {
                this.isFocused = false;
                this.blurInput();
            }
        },
        onFocusInput(event) {
            console.log(event.target);
            const isDoubleClicked = event.detail > 1;

            if (isDoubleClicked || this.isFocused) {
                return false;
            }

            this.focusInput();
            this.$emit('focus', true);

            return true;
        },
        onClickOutside(event) {
            const isDoubleClicked = event.detail > 1;

            if (isDoubleClicked && this.dismissible) return false;

            const { clientX, clientY } = event;
            const inputActivator = this.$el.querySelector('.input__content');
            const {
                top, left, width, height,
            } = inputActivator.getBoundingClientRect();
            const isClickedInsideInput = this.$el.contains(event.target)
                && clientX > left
                && clientX < left + width
                && clientY > top
                && clientY < top + height;

            if (isClickedInsideInput) {
                if (this.dismissible) {
                    this.isFocused = !this.isFocused;
                } else {
                    this.isFocused = true;
                    const input = this.$el.querySelector('input') || this.$el.querySelector('textarea');
                    input.focus();
                }
            } else {
                this.isFocused = false;
            }

            if (!this.isFocused) {
                this.blurInput();

                this.$emit('focus', false);
            }

            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/input.scss";
</style>
