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
            :class="inputContentStyle"
            @click="focusInput">
            <label
                v-if="label"
                :class="floatingLabelClasses"
                :style="floatingLabelPosition"
                v-text="label" />
            <slot name="prependIcon">
                <Icon
                    v-if="prependIcon"
                    :icon="prependIcon" />
            </slot>
            <slot
                name="input"
                :on-focus-lost="blurInput" />
            <slot name="appendIcon">
                <Icon
                    v-if="appendIcon"
                    :icon="appendIcon" />
            </slot>
        </div>
        <slot
            name="select"
            :dismiss-select="dismissSelect"
            :is-focused="isFocused" />
        <label
            v-if="informationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>
import Icon from '~/components/Icon/Icon';

export default {
    name: 'InputBase',
    components: {
        Icon,
    },
    props: {
        value: {
            type: [Array, String, Number],
            required: false,
            default: null,
        },
        appendIcon: {
            type: String,
            required: false,
            default: null,
        },
        prependIcon: {
            type: String,
            required: false,
            default: null,
        },
        solid: {
            type: Boolean,
            required: false,
            default: false,
        },
        underline: {
            type: Boolean,
            required: false,
            default: false,
        },
        leftAlignment: {
            type: Boolean,
            required: false,
            default: false,
        },
        centerAlignment: {
            type: Boolean,
            required: false,
            default: false,
        },
        dismissible: {
            type: Boolean,
            required: false,
            default: false,
        },
        label: {
            type: String,
            required: false,
            default: null,
        },
        placeholder: {
            type: String,
            required: false,
            default: null,
        },
        errorMessages: {
            type: [String, Array],
            required: false,
            default: '',
        },
        hint: {
            type: String,
            required: false,
            default: '',
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        autofocus: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        small: {
            type: Boolean,
            required: false,
            default: false,
        },
        regular: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isFocused: false,
            isClickedOutside: false,
            lostFocusOnTabulator: false,
            isMounted: false,
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
        inputContentStyle() {
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
        floatingLabelPosition() {
            if (!this.isMounted) return null;

            if (this.isFocused || !this.isEmpty || this.isPlaceholder) {
                const { inputContent } = this.$refs;

                return {
                    transform: `translateY(-${inputContent.offsetHeight / 2}px)`,
                    backgroundColor: '#fff',
                };
            }

            return null;
        },
        floatingLabelClasses() {
            const typoClass = this.isFocused || !this.isEmpty || this.isPlaceholder
                ? 'typo-btn--xs'
                : 'typo-subtitle';

            return [
                'input__label',
                typoClass,
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
    watch: {
        isFocused() {
            const input = this.$el.querySelector('input') || this.$el.querySelector('textarea');

            if (!this.isFocused) {
                window.removeEventListener('click', this.onClickOutside);
            } else {
                window.addEventListener('click', this.onClickOutside);
                input.focus();
            }

            this.$emit('focus', this.isFocused);
        },
    },
    mounted() {
        // Focus input on auto focus set
        if (this.autofocus) {
            this.isFocused = true;
            window.addEventListener('click', this.onClickOutside);
            const input = this.$el.querySelector('input') || this.$el.querySelector('textarea');
            input.focus();
        }

        this.isMounted = true;
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        onKeyUp(event) {
            const { keyCode } = event;
            // Tab
            if (keyCode === 9 && !this.isFocused) {
                this.isFocused = true;
                this.lostFocusOnTabulator = false;
            }
        },
        onKeyDown(event) {
            const { keyCode } = event;

            // Tab
            if (keyCode === 9 && this.isFocused) {
                this.isFocused = false;
                this.lostFocusOnTabulator = true;
            }
        },
        focusInput(event) {
            const isDoubleClicked = event.detail > 1;

            if (isDoubleClicked || this.isFocused) {
                return false;
            }

            this.isFocused = true;
            this.isClickedOutside = false;
            this.lostFocusOnTabulator = false;

            return true;
        },
        blurInput(event) {
            const isClickedInsideInput = this.$el.contains(event.target);
            this.isFocused = isClickedInsideInput
                && !this.isClickedOutside
                && !this.lostFocusOnTabulator;
        },
        dismissSelect() {
            this.isFocused = false;
            this.isClickedOutside = false;
            this.lostFocusOnTabulator = false;

            this.$emit('apply');
        },
        onClickOutside(event) {
            const inputActivator = this.$el.querySelector('.input__content');
            const {
                top, left, width, height,
            } = inputActivator.getBoundingClientRect();
            const { clientX, clientY } = event;

            if (!this.dismissible) {
                const isClickedInsideInput = this.$el.contains(event.target);
                this.isFocused = isClickedInsideInput && !this.dismissible;
            } else if (!(clientX > left
                && clientX < left + width
                && clientY > top
                && clientY < top + height)) {
                this.isFocused = false;
                this.isClickedOutside = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/input.scss";
</style>
