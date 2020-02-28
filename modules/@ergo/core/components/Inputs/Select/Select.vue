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
            <div class="input__value">
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
                :style="floatingLabelTransforms"
                v-text="label" />
            <div class="input__append">
                <slot name="append" />
                <ErrorHint
                    v-if="isError"
                    :hint="parsedErrorMessages" />
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
                :offset="dropDownOffset"
                :fixed="fixedContent">
                <template #body>
                    <slot name="selectContent">
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
                                @click.native.prevent="onSelectValue(option)">
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
                        <ContentBaseFooter
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
                        </ContentBaseFooter>
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
import { SIZES, THEMES } from '@Core/defaults/buttons';
import { ARROW } from '@Core/defaults/icons';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import DropDown from '@Core/components/Inputs/Select/Contents/DropDown';
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
        DropDownListSearch: () => import('@Core/components/Inputs/Select/Contents/DropDownListSearch'),
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
        ContentBaseFooter: () => import('@Core/components/Inputs/Select/Contents/Footers/ContentBaseFooter'),
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
            hasMouseDown: false,
            associatedLabel: '',
            isSearchFocused: false,
        };
    },
    computed: {
        dropDownOffset() {
            const {
                x, y, width, height,
            } = this.$refs.activator.getBoundingClientRect();

            return {
                x, y, width, height,
            };
        },
        stringifiedOptions() {
            return this.options.map(option => JSON.stringify(option));
        },
        tinySize() {
            return SIZES.TINY;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        isOptionsValid() {
            return this.options.length && typeof this.options[0] !== 'object';
        },
        dropDownState() {
            return this.isMenuActive
                ? ARROW.UP
                : ARROW.DOWN;
        },
        isEmptyOptions() {
            return Object.keys(this.selectedOptions).length === 0;
        },
        isFloatingLabel() {
            return this.label !== '' && this.label !== null;
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
                    'floating-label': this.label,
                    'input--error': this.isError,
                    'input--focused': this.isMenuActive,
                    'input--disabled': this.disabled,
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
        floatingLabelTransforms() {
            if (this.isMenuActive || !this.isEmptyOptions) {
                return {
                    transform: this.small
                        ? 'translateY(calc(-100%))'
                        : 'translateY(calc(-100% - 4px))',
                };
            }

            return {
                transform: 'translateY(0)',
            };
        },
        floatingLabelClasses() {
            return [
                'input__label',
                this.isEmptyOptions && !this.isMenuActive ? 'font--medium-14-20' : 'font--medium-12-16',
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
        placeholderValue() {
            return this.isEmptyOptions ? this.placeholder : null;
        },
    },
    created() {
        if (this.multiselect) {
            this.value.forEach((option) => {
                this.selectedOptions[JSON.stringify(option)] = option;
            });
        } else if (this.value || this.value === 0) {
            this.selectedOptions = { [JSON.stringify(this.value)]: this.value };
        }
    },
    mounted() {
        if (this.autofocus) {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        }

        this.associatedLabel = `input-${this._uid}`;
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        isOptionValid(option) {
            return typeof option !== 'object';
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
        onSelectValue(value) {
            const valueKey = JSON.stringify(value);

            if (this.multiselect) {
                if (typeof this.selectedOptions[valueKey] !== 'undefined') {
                    delete this.selectedOptions[valueKey];
                } else {
                    this.selectedOptions[valueKey] = value;
                }

                this.selectedOptions = { ...this.selectedOptions };

                this.$emit('input', Object.values(this.selectedOptions));
            } else {
                this.selectedOptions = { [valueKey]: value };

                this.$emit('input', value);
            }
        },
        onDismiss() {
            this.isClickedOutside = true;

            this.onBlur();
        },
        onFocus() {
            if (!this.isMenuActive) {
                this.isMenuActive = true;
                this.hasMouseDown = false;

                window.addEventListener('click', this.onClickOutside);

                this.$emit('focus', true);
            }
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

            const isClickedInsideInput = event.target === this.$refs.input;

            if (!isClickedInsideInput) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.hasMouseDown = true;
            this.isMouseMoving = false;
        },
        onMouseUp(event) {
            this.$refs.activator.removeEventListener('mousemove', this.onMouseMove);

            const isClickedInsideActivator = this.$refs.activator.contains(event.target);
            const isDblClicked = event.detail > 1;

            if (isDblClicked) return;

            if (this.dismissible) {
                if (isClickedInsideActivator) {
                    if (this.isMenuActive && this.hasMouseDown && !this.isMouseMoving) {
                        this.isClickedOutside = true;
                        this.$refs.input.blur();
                    } else {
                        this.$refs.input.focus();
                    }
                }
            } else if (!isClickedInsideActivator) {
                this.$refs.input.focus();
            }

            this.hasMouseDown = false;
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
