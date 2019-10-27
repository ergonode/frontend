/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="inputClasses"
        @keyup="onKeyUp"
        @keydown="onKeyDown">
        <div
            ref="activator"
            :class="activatorClasses"
            @click="onFocusInput">
            <slot name="prepend" />
            <label
                v-if="label"
                :class="floatingLabelClasses"
                :style="floatingLabelTransforms"
                v-text="label" />
            <slot name="input" />
            <slot name="append">
                <IconArrowDropDown :state="dropDownState" />
            </slot>
        </div>
        <FadeTransition v-if="isFocused">
            <SelectBaseContent
                :style="selectBoundingBox"
                :fixed-content="fixedContentWidth">
                <template #body>
                    <slot name="selectContent" />
                </template>
                <template
                    v-if="clearable"
                    #footer>
                    <MultiselectContentFooter
                        v-if="multiselect"
                        @clear="onClear"
                        @apply="dismissSelect" />
                    <SelectContentFooter
                        v-else
                        @clear="onClear"
                        @apply="dismissSelect" />
                </template>
            </SelectBaseContent>
        </FadeTransition>
        <label
            v-if="informationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';
import FadeTransition from '~/components/Transitions/FadeTransition';
import SelectBaseContent from '~/components/Inputs/Select/Contents/SelectBaseContent';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';
import MultiselectContentFooter from '~/components/Inputs/Select/Contents/Footers/MultiselectContentFooter';
import SelectContentFooter from '~/components/Inputs/Select/Contents/Footers/SelectContentFooter';

export default {
    name: 'InputSelectBase',
    components: {
        FadeTransition,
        SelectBaseContent,
        IconArrowDropDown,
        MultiselectContentFooter,
        SelectContentFooter,
    },
    props: {
        value: {
            type: [Array, String, Number, Date],
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
        clearable: {
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
        multiselect: {
            type: Boolean,
            default: false,
        },
        dismissible: {
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
        fixedContentWidth: {
            type: Boolean,
            default: true,
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
            selectBoundingBox: null,
        };
    },
    computed: {
        dropDownState() {
            return this.isFocused
                ? Arrow.UP
                : Arrow.DOWN;
        },
        isEmpty() {
            return this.value === '' || this.value === null;
        },
        isFloatingLabel() {
            return this.label !== null;
        },
        isPlaceholder() {
            return this.placeholder !== null;
        },
        inputClasses() {
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
        activatorClasses() {
            return [
                'input__activator',
                {
                    'input__activator--small': this.small,
                    'input__activator--regular': this.regular,
                },
            ];
        },
        informationLabelClasses() {
            return [
                'input__information-label',
            ];
        },
        floatingLabelTransforms() {
            if (!this.isMounted) return null;

            if (this.isFocused || !this.isEmpty || this.isPlaceholder) {
                const { activator } = this.$refs;
                const translateX = this.solid ? '-4px' : '-5px';
                const transform = `translate(${translateX}, -${activator.offsetHeight / 2}px) scale(0.9)`;

                return {
                    transform,
                    backgroundColor: WHITE,
                };
            }

            return null;
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
            this.selectBoundingBox = this.getSelectBoundingBox();
        }

        this.isMounted = true;
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        focusInput() {
            const input = this.$el.querySelector('input');
            window.addEventListener('click', this.onClickOutside);
            input.focus();
        },
        blurInput() {
            const input = this.$el.querySelector('input');
            window.removeEventListener('click', this.onClickOutside);
            input.blur();
        },
        onClear() {
            this.$emit('clear', this.multiselect ? [] : '');
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
            const isDoubleClicked = event.detail > 1;

            if (isDoubleClicked || this.isFocused) {
                return false;
            }

            this.focusInput();
            this.$emit('focus', true);

            return true;
        },
        dismissSelect() {
            this.isFocused = false;
            this.blurInput();

            this.$emit('focus', false);
        },
        onClickOutside(event) {
            const isDoubleClicked = event.detail > 1;

            if (isDoubleClicked) return false;

            const { pageX, pageY } = event;
            const activator = this.$el.querySelector('.input__activator');
            const {
                top, left, width, height,
            } = activator.getBoundingClientRect();
            const isClickedInsideInput = this.$el.contains(event.target)
                && pageX > left
                && pageX < left + width
                && pageY > top
                && pageY < top + height;

            if (isClickedInsideInput) {
                if (this.dismissible) {
                    this.isFocused = !this.isFocused;
                } else {
                    this.isFocused = true;
                    const input = this.$el.querySelector('input');
                    input.focus();
                }
            } else {
                const selectContentEl = this.$el.querySelector('.select-base-content');

                if (selectContentEl) {
                    const {
                        top: contentTop,
                        left: contentLeft,
                        width: contentWidth,
                        height: contentHeight,
                    } = selectContentEl.getBoundingClientRect();

                    const isClickedInsideSelectContent = pageX > left
                        && pageX < contentLeft + contentWidth
                        && pageY > contentTop
                        && pageY < contentTop + contentHeight;

                    if (!isClickedInsideSelectContent || !this.multiselect) this.isFocused = false;
                }
            }

            if (this.isFocused) {
                this.selectBoundingBox = this.getSelectBoundingBox();
            }

            if (!this.isFocused) {
                this.blurInput();

                this.$emit('focus', false);
            }

            return true;
        },
        getSelectBoundingBox() {
            const {
                x,
                y,
                height,
                width,
            } = this.$el.getBoundingClientRect();
            const { innerHeight } = window;
            const maxHeight = 200;

            const position = { left: `${x}px` };

            if (this.fixedContentWidth) {
                position.width = `${width}px`;
            }

            if (innerHeight - y < maxHeight) {
                const offsetBottom = innerHeight - y;

                position.bottom = `${offsetBottom + 1}px`;

                return position;
            }

            position.top = `${y + height + 2}px`;

            return position;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/input.scss";
</style>
