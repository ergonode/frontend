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
        <FadeTransition>
            <DropDown
                v-if="isMenuActive"
                ref="menu"
                :offset="getDropDownOffset()"
                :fixed="fixedContent">
                <template #body>
                    <slot name="dropdown">
                        <List>
                            <DropDownListSearch
                                v-if="searchable"
                                :value="searchResult"
                                @input="onSearch"
                                @searchFocused="onSearchFocused" />
                            <ListElement
                                v-for="(option, index) in options"
                                :key="index"
                                :small="small"
                                :regular="regular"
                                :selected="isOptionSelected(index)"
                                @click.native.prevent="onSelectValue(option, index)">
                                <template #default="{ isSelected }">
                                    <slot
                                        name="option"
                                        :option="option"
                                        :is-selected="isSelected"
                                        :index="index">
                                        <template v-if="isOptionsValid">
                                            <ListElementAction
                                                v-if="multiselect"
                                                :small="small">
                                                <CheckBox :value="isSelected" />
                                            </ListElementAction>
                                            <ListElementDescription>
                                                <ListElementTitle
                                                    :small="small"
                                                    :title="option" />
                                            </ListElementDescription>
                                        </template>
                                    </slot>
                                </template>
                            </ListElement>
                        </List>
                    </slot>
                </template>
                <template
                    v-if="clearable"
                    #footer>
                    <slot
                        name="footer"
                        :clear="onClear"
                        :apply="onDismiss">
                        <DropDownFooter
                            :small="small"
                            :space-between="multiselect">
                            <Button
                                v-if="multiselect"
                                :size="tinySize"
                                title="OK"
                                @click.native="onDismiss" />
                            <Button
                                :size="tinySize"
                                :title="multiselect ? 'CLEAR ALL' : 'CLEAR'"
                                :theme="secondaryTheme"
                                @click.native="onClear" />
                        </DropDownFooter>
                    </slot>
                </template>
            </DropDown>
        </FadeTransition>
        <label
            v-if="informationLabel"
            ref="informationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { ARROW } from '@Core/defaults/icons';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import DropDown from '@Core/components/Inputs/Select/DropDown/DropDown';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';

export default {
    name: 'Select',
    components: {
        FadeTransition,
        DropDown,
        IconArrowDropDown,
        ListElementDescription,
        ListElementTitle,
        List: () => import('@Core/components/List/List'),
        ListElement: () => import('@Core/components/List/ListElement'),
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        DropDownListSearch: () => import('@Core/components/Inputs/Select/DropDown/DropDownListSearch'),
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
        DropDownFooter: () => import('@Core/components/Inputs/Select/DropDown/Footers/DropDownFooter'),
        Button: () => import('@Core/components/Buttons/Button'),
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
        dropDownHeight: {
            type: Number,
            default: 200,
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
            isMouseMoving: false,
            isMenuActive: false,
            isClickedOutside: false,
            associatedLabel: '',
            isSearchFocused: false,
        };
    },
    computed: {
        stringifiedOptions() {
            return this.options.map(option => JSON.stringify(option));
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isOptionsValid() {
            return this.options.length && typeof this.options[0] !== 'object';
        },
        dropDownState() {
            return this.isMenuActive
                ? ARROW.UP
                : ARROW.DOWN;
        },
        hasAnyValueSelected() {
            return Object.keys(this.selectedOptions).length > 0;
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

                if (this.multiselect) {
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

        this.associatedLabel = `input-${this._uid}`;
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
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
        isOptionSelected(index) {
            return typeof this.selectedOptions[this.stringifiedOptions[index]] !== 'undefined';
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onSearchFocused(isFocused) {
            this.isSearchFocused = isFocused;
        },
        onClear() {
            this.selectedOptions = {};

            this.$emit('input', this.multiselect ? [] : '');
        },
        onSelectValue(value, index) {
            if (this.multiselect) {
                const selectedOptions = { ...this.selectedOptions };

                if (this.isOptionSelected(index)) {
                    delete selectedOptions[this.stringifiedOptions[index]];
                } else {
                    selectedOptions[this.stringifiedOptions[index]] = value;
                }

                this.$emit('input', Object.values(selectedOptions));
            } else {
                this.$emit('input', value);
            }
        },
        onDismiss() {
            this.isClickedOutside = true;

            this.onBlur();
        },
        onFocus() {
            this.isMenuActive = true;

            window.addEventListener('click', this.onClickOutside);

            this.$emit('focus', true);
        },
        onBlur() {
            if (this.isClickedOutside) {
                this.isMenuActive = false;
                this.searchResult = '';

                window.removeEventListener('click', this.onClickOutside);

                this.onSearch(this.searchResult);
                this.$emit('focus', false);
            }
        },
        onKeyDown(event) {
            // TAB
            if (event.keyCode === 9) {
                this.isClickedOutside = true;
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
                    this.isClickedOutside = true;
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
        onClickOutside(event) {
            const isClickedInsideMenu = this.$refs.menu.$el.contains(event.target);
            const isClickedInsideActivator = this.$refs.activator.contains(event.target);
            this.isClickedOutside = !isClickedInsideMenu
                && !isClickedInsideActivator;

            if (this.isClickedOutside || (isClickedInsideMenu
                && !this.multiselect
                && this.dismissible
                && !this.isSearchFocused)
            ) {
                this.isMenuActive = false;
                this.searchResult = '';

                window.removeEventListener('click', this.onClickOutside);

                this.onSearch(this.searchResult);
                this.$emit('focus', false);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "@Core/assets/scss/input/input.scss";
</style>
