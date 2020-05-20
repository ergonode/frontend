/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="inputClasses"
        @keydown="onKeyDown">
        <div
            ref="activator"
            :class="activatorClasses"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot name="prepend" />
            <div
                data-cy="selectValue"
                class="input__value"
                v-if="hasAnyValueSelected">
                <slot name="value">
                    <span v-text="multiselect ? value.join(', ') : value" />
                </slot>
            </div>
            <input
                :id="associatedLabel"
                ref="input"
                :placeholder="placeholderValue"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                type="text"
                readonly
                @focus="onFocus"
                @blur="onBlur">
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                v-text="label" />
            <div class="input__append">
                <slot name="append" />
                <ErrorHint
                    v-if="isError"
                    :hint="errorMessages" />
                <InfoHint
                    v-if="isDescription"
                    :hint="description" />
                <IconArrowDropDown :state="dropDownState" />
            </div>
        </div>
        <SelectDropDown
            v-if="needsToRender"
            data-cy="selectDropDown"
            ref="menu"
            :offset="offset"
            :fixed="fixedContent"
            :small="small"
            :regular="regular"
            :multiselect="multiselect"
            :clearable="clearable"
            :fixed-content="fixedContent"
            :searchable="searchable"
            :options="options"
            :selected-options="selectedOptions"
            :search-result="searchResult"
            :is-visible="isMenuActive"
            @dismiss="onDismiss"
            @clear="onClear"
            @search="onSearch"
            @input="onSelectValue"
            @clickOutside="onClickOutside">
            <template #dropdown>
                <slot name="dropdown" />
            </template>
            <template #option="{ option, isSelected, index }">
                <slot
                    name="option"
                    :option="option"
                    :is-selected="isSelected"
                    :index="index" />
            </template>
            <template #footer>
                <slot
                    name="footer"
                    :clear="onClear"
                    :apply="onDismiss" />
            </template>
        </SelectDropDown>
        <slot name="informationLabel">
            <label
                v-if="informationLabel"
                :class="informationLabelClasses"
                v-text="informationLabel" />
        </slot>
    </div>
</template>

<script>
import { ARROW } from '@Core/defaults/icons';
import SelectDropDown from '@Core/components/Inputs/Select/DropDown/SelectDropDown';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';

export default {
    name: 'Select',
    components: {
        SelectDropDown,
        IconArrowDropDown,
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
    },
    props: {
        value: {
            type: [Array, String, Number, Object],
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
        solid: {
            type: Boolean,
            default: false,
        },
        underline: {
            type: Boolean,
            default: false,
        },
        fixedContent: {
            type: Boolean,
            default: true,
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
        autofocus: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        multiselect: {
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
        searchable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedOptions: {},
            searchResult: '',
            isBlurringNeeded: false,
            isMouseMoving: false,
            isMenuActive: false,
            associatedLabel: '',
            hasAnyValueSelected: false,
            needsToRender: false,
            offset: {},
        };
    },
    computed: {
        dropDownState() {
            return this.isMenuActive
                ? ARROW.UP
                : ARROW.DOWN;
        },
        isDescription() {
            return this.description !== '' && this.description !== null;
        },
        inputClasses() {
            return [
                'input',
                {
                    solid: this.solid,
                    underline: this.underline,
                    small: this.small,
                    regular: this.regular,
                    'left-alignment': this.leftAlignment,
                    'center-alignment': this.centerAlignment,
                    'floating-label': this.label && this.label.length > 0,
                    'input--error': this.isError,
                    'input--focused': this.isMenuActive,
                    'input--disabled': this.disabled,
                    'input--has-value': this.hasAnyValueSelected,
                },
            ];
        },
        activatorClasses() {
            return [
                'input__activator',
            ];
        },
        informationLabelClasses() {
            return [
                'input__information-label',
            ];
        },
        floatingLabelClasses() {
            return [
                'input__label',
                { 'input__label--required': this.required },
            ];
        },
        informationLabel() {
            return this.errorMessages || this.hint;
        },
        isError() {
            return Boolean(this.errorMessages);
        },
        placeholderValue() {
            if (!this.hasAnyValueSelected && this.label && !this.isMenuActive) return null;

            return !this.hasAnyValueSelected ? this.placeholder : null;
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                let selectedOptions = {};

                if (this.multiselect && this.value && Array.isArray(this.value)) {
                    this.value.forEach((option) => {
                        selectedOptions[JSON.stringify(option)] = option;
                    });
                } else if (this.value || this.value === 0) {
                    selectedOptions = { [JSON.stringify(this.value)]: this.value };
                }

                this.selectedOptions = selectedOptions;
            },
        },
    },
    mounted() {
        if (this.autofocus) {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        }

        this.hasAnyValueSelected = Object.keys(this.selectedOptions).length > 0;
        this.associatedLabel = `input-${this._uid}`;
    },
    methods: {
        getDropDownOffset() {
            const {
                x, y, width, height,
            } = this.$refs.activator.getBoundingClientRect();

            return {
                x, y, width, height,
            };
        },
        blur() {
            this.isMenuActive = false;
            this.searchResult = '';

            this.onSearch(this.searchResult);
            this.$emit('focus', false);
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onClear() {
            this.selectedOptions = {};
            this.hasAnyValueSelected = false;

            this.$emit('input', this.multiselect ? [] : '');
        },
        onSelectValue(value) {
            this.hasAnyValueSelected = true;

            this.$emit('input', value);
        },
        onDismiss() {
            this.isBlurringNeeded = true;
            this.blur();
        },
        onFocus() {
            this.isBlurringNeeded = false;
            this.offset = this.getDropDownOffset();
            this.isMenuActive = true;

            if (!this.needsToRender) {
                this.needsToRender = true;
            }

            this.$emit('focus', true);
        },
        onBlur() {
            if (this.isBlurringNeeded) {
                this.blur();
            }
        },
        onKeyDown(event) {
            // TAB
            if (event.keyCode === 9) {
                this.isBlurringNeeded = true;
                this.$refs.input.blur();
            }
        },
        onMouseDown(event) {
            this.$refs.activator.addEventListener('mousemove', this.onMouseMove);

            event.preventDefault();
            event.stopPropagation();

            this.isMouseMoving = false;
        },
        onMouseUp() {
            this.$refs.activator.removeEventListener('mousemove', this.onMouseMove);

            if (this.dismissible) {
                if (this.isMenuActive) {
                    this.isBlurringNeeded = true;
                    this.$refs.input.blur();
                } else {
                    this.$refs.input.focus();
                }
            } else {
                this.$refs.input.focus();
            }

            this.isMouseMoving = false;
        },
        onMouseMove() {
            this.isMouseMoving = true;
        },
        onClickOutside({ event, isClickedOutside }) {
            const isClickedInsideActivator = this.$refs.activator.contains(event.target);

            if (isClickedOutside
                || (isClickedInsideActivator && !this.dismissible)
                || (!isClickedOutside && !this.multiselect && this.dismissible)) {
                this.isBlurringNeeded = true;
                this.blur();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "@Core/assets/scss/input/input.scss";
</style>
