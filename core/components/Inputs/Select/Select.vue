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
            <input
                :id="associatedLabel"
                ref="input"
                :value="multiselect ? value.join(', ') : value"
                :placeholder="placeholderValue"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                type="text"
                readonly
                @input="onValueChange"
                @focus="onFocus"
                @blur="onBlur">
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                :style="floatingLabelTransforms"
                v-text="label" />
            <div
                class="input__append">
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
                :style="selectBoundingBox"
                :fixed-content="fixedContentWidth">
                <template #body>
                    <slot name="selectContent">
                        <List>
                            <DropDownListSearch
                                v-if="searchable"
                                @search="onSearch"
                                @searchFocused="onSearchFocused" />
                            <template v-for="(option, index) in options">
                                <slot
                                    name="option"
                                    :option="option"
                                    :index="index">
                                    <ListElement
                                        v-if="isOptionsValid"
                                        :key="option.id"
                                        :small="small"
                                        :large="!small && regular"
                                        :selected="selectedOptions[option]"
                                        @click.native="onSelectValue(option)">
                                        <ListElementAction
                                            v-if="multiselect"
                                            :small="small">
                                            <CheckBox
                                                :value="selectedOptions[option]"
                                                @input.native="onSelectValue(option)" />
                                        </ListElementAction>
                                        <ListElementDescription>
                                            <ListElementTitle
                                                :small="small"
                                                :title="option" />
                                        </ListElementDescription>
                                    </ListElement>
                                </slot>
                            </template>
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
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>
import { SIZES, THEMES } from '~/defaults/buttons';
import { ARROW } from '~/defaults/icons';
import FadeTransition from '~/core/components/Transitions/FadeTransition';
import DropDown from '~/core/components/Inputs/Select/Contents/DropDown';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';

export default {
    name: 'Select',
    components: {
        FadeTransition,
        DropDown,
        IconArrowDropDown,
        List: () => import('~/core/components/List/List'),
        ListElement: () => import('~/core/components/List/ListElement'),
        ListElementAction: () => import('~/core/components/List/ListElementAction'),
        ListElementDescription: () => import('~/core/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/core/components/List/ListElementTitle'),
        DropDownListSearch: () => import('~/core/components/Inputs/Select/Contents/DropDownListSearch'),
        CheckBox: () => import('~/core/components/Inputs/CheckBox'),
        InfoHint: () => import('~/core/components/Hints/InfoHint'),
        ErrorHint: () => import('~/core/components/Hints/ErrorHint'),
        ContentBaseFooter: () => import('~/core/components/Inputs/Select/Contents/Footers/ContentBaseFooter'),
        Button: () => import('~/core/components/Buttons/Button'),
    },
    props: {
        value: {
            type: [Array, String, Number],
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
        fixedContentWidth: {
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
            selectBoundingBox: null,
            isFocused: false,
            isMounted: false,
            isMouseMoving: false,
            isMenuActive: false,
            isClickedOutside: false,
            hasMouseDown: false,
            associatedLabel: '',
            isSearchFocused: false,
        };
    },
    created() {
        if (this.isOptionsValid) {
            if (this.multiselect) {
                this.value.forEach(({ id }) => {
                    this.selectedOptions[id] = true;
                });
            } else if (this.value || this.value === 0) {
                this.selectedOptions = { [this.value]: true };
            }
        }
    },
    mounted() {
        if (this.autofocus) {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        }

        this.isMounted = true;
        this.associatedLabel = `input-${this._uid}`;
        console.log('mounted');
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
        console.log('destroying');
    },
    computed: {
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
            return this.isFocused
                ? ARROW.UP
                : ARROW.DOWN;
        },
        isEmptyOptions() {
            return this.multiselect ? !this.value.length : (this.value === '' || this.value === null);
        },
        isFloatingLabel() {
            return this.label !== '' && this.label !== null;
        },
        isPlaceholder() {
            return this.placeholder !== '' && this.placeholder !== null;
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
            ];
        },
        informationLabelClasses() {
            return [
                'input__information-label',
            ];
        },
        floatingLabelTransforms() {
            if (!this.isMounted) return null;

            if (this.isFocused || !this.isEmptyOptions) {
                const transform = 'translateY(calc(-100% + -4px))';

                return {
                    transform,
                };
            }

            return {
                transform: 'translateY(0)',
            };
        },
        floatingLabelClasses() {
            return [
                'input__label',
                this.isEmptyOptions && !this.isFocused ? 'font--medium-14-20' : 'font--medium-12-16',
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
            return this.isFocused && !this.value ? this.placeholder : null;
        },
    },
    methods: {
        isOptionValid(option) {
            return typeof option !== 'object';
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onSearchFocused(isFocused) {
            this.isSearchFocused = isFocused;
        },
        onClear() {
            this.selectedOptions = {};

            this.$emit('input', this.multiselect ? [] : {});
        },
        onSelectValue(value) {
            if (this.multiselect) {
                if (typeof this.selectedOptions[value] !== 'undefined') {
                    delete this.selectedOptions[value];
                } else {
                    this.selectedOptions[value] = true;
                }

                this.$emit('input', this.options.filter((option) => typeof this.selectedOptions[option] !== 'undefined'));
            } else {
                this.selectedOptions = { [value]: true };

                this.$emit('input', value);
            }
        },
        onDismiss() {
            this.isClickedOutside = true;

            this.onBlur();
        },
        onValueChange(event) {
            this.$emit('input', event.target.value);
        },
        onFocus() {
            if (!this.isFocused) {
                this.isFocused = true;
                this.isMenuActive = true;
                this.hasMouseDown = false;
                this.selectBoundingBox = this.getSelectBoundingBox();

                window.addEventListener('click', this.onClickOutside);

                this.$emit('focus', true);
            }
        },
        onBlur() {
            if (this.isClickedOutside) {
                this.isFocused = false;
                this.isMenuActive = false;

                window.removeEventListener('click', this.onClickOutside);

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
                    if (this.isFocused && this.hasMouseDown && !this.isMouseMoving) {
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
                this.isFocused = false;
                this.isMenuActive = false;

                window.removeEventListener('click', this.onClickOutside);

                this.$emit('focus', false);
            }
        },
        getSelectBoundingBox() {
            const {
                x,
                y,
                height,
                width,
            } = this.$el.getBoundingClientRect();
            let hintHeight = 0;
            const hint = this.$el.querySelector('.input__information-label');
            const { innerHeight } = window;
            const maxHeight = this.dropDownHeight;
            const position = { left: `${x}px` };

            if (hint) {
                hintHeight = hint.getBoundingClientRect().height;
            }

            if (this.fixedContentWidth) {
                position.maxHeight = `${maxHeight}px`;
                position.width = `${width}px`;
            }

            if (innerHeight - y < maxHeight) {
                const offsetBottom = innerHeight - y;

                position.bottom = `${offsetBottom + 1}px`;

                return position;
            }
            position.top = hint ? `${y + height - hintHeight - 2}px` : `${y + height + 2}px`;

            return position;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/input.scss";
</style>
