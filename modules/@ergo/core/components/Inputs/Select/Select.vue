/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="styleComponent"
        ref="activator"
        :data-cy="dataCy"
        :focused="isFocused"
        :error="isError"
        :disabled="disabled"
        :alignment="alignment"
        :size="size"
        :details-label="informationLabel"
        @keydown.native="onKeyDown"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp">
        <template #activator>
            <InputController
                :size="size">
                <slot name="prepend" />
                <InputSelectValue
                    v-if="hasAnyValueSelected"
                    :data-cy="`${dataCy}-value`"
                    :size="size"
                    :alignment="alignment"
                    :disabled="disabled"
                    :value="multiselect ? value.join(', ') : value">
                    <template #value>
                        <slot name="value" />
                    </template>
                </InputSelectValue>
                <input
                    :id="associatedLabel"
                    :class="inputClasses"
                    ref="input"
                    :placeholder="placeholderValue"
                    :disabled="disabled"
                    :aria-label="label || 'no description'"
                    type="text"
                    readonly
                    @focus="onFocus"
                    @blur="onBlur">
                <InputLabel
                    v-if="label"
                    :for="associatedLabel"
                    :required="required"
                    :size="size"
                    :floating="isFocused || hasAnyValueSelected"
                    :focused="isFocused"
                    :disabled="disabled"
                    :error="isError"
                    :label="label" />
                <template #append>
                    <slot name="append" />
                    <ErrorHint
                        v-if="isError"
                        :hint="errorMessages" />
                    <IconArrowDropDown :state="dropDownState" />
                </template>
            </InputController>
        </template>
        <SelectDropDown
            v-if="needsToRender"
            :data-cy="`${dataCy}-drop-down`"
            ref="menu"
            :offset="offset"
            :fixed="fixedContent"
            :size="size"
            :multiselect="multiselect"
            :clearable="clearable"
            :fixed-content="fixedContent"
            :searchable="searchable"
            :sticky-search="stickySearch"
            :options="options"
            :selected-options="selectedOptions"
            :search-result="searchResult"
            :is-visible="isFocused"
            @dismiss="onDismiss"
            @clear="onClear"
            @search="onSearch"
            @input="onSelectValue"
            @clickOutside="onClickOutside">
            <template #dropdown>
                <slot
                    name="dropdown"
                    :on-select-value-callback="onSelectValue" />
            </template>
            <template #option="{ index, option, isSelected, isSmallSize }">
                <slot
                    name="option"
                    :option="option"
                    :is-selected="isSelected"
                    :is-small-size="isSmallSize"
                    :index="index" />
            </template>
            <template #footer>
                <slot
                    name="footer"
                    :clear="onClear"
                    :apply="onDismiss" />
            </template>
        </SelectDropDown>
        <template #details>
            <slot name="details" />
        </template>
    </Component>
</template>

<script>
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import InputController from '@Core/components/Inputs/InputController';
import InputLabel from '@Core/components/Inputs/InputLabel';
import InputSelectValue from '@Core/components/Inputs/InputSelectValue';
import SelectDropDown from '@Core/components/Inputs/Select/DropDown/SelectDropDown';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import associatedLabelMixin from '@Core/mixins/inputs/associatedLabelMixin';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'Select',
    components: {
        SelectDropDown,
        IconArrowDropDown,
        InputController,
        InputLabel,
        InputSelectValue,
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
    },
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        value: {
            type: [
                Array,
                String,
                Number,
                Object,
            ],
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        fixedContent: {
            type: Boolean,
            default: true,
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
        searchable: {
            type: Boolean,
            default: false,
        },
        stickySearch: {
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
            selectedOptions: {},
            searchResult: '',
            isBlurringNeeded: false,
            isMouseMoving: false,
            isFocused: false,
            hasAnyValueSelected: false,
            needsToRender: false,
            offset: {},
        };
    },
    computed: {
        styleComponent() {
            return () => import(`@Core/components/Inputs/Input${toCapitalize(this.type)}Style`);
        },
        inputClasses() {
            return [
                'select',
                `select--${this.alignment}`,
            ];
        },
        dropDownState() {
            return this.isFocused
                ? ARROW.UP
                : ARROW.DOWN;
        },
        informationLabel() {
            return this.errorMessages || this.hint;
        },
        isError() {
            return Boolean(this.errorMessages);
        },
        placeholderValue() {
            if (!this.hasAnyValueSelected || (this.label && !this.isFocused)) return null;

            return this.placeholder;
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                let selectedOptions = {};

                if (Array.isArray(this.value) && this.value.length) {
                    this.value.forEach((option) => {
                        selectedOptions[JSON.stringify(option)] = option;
                    });
                    this.hasAnyValueSelected = true;
                } else if (!Array.isArray(this.value) && (this.value || this.value === 0)) {
                    selectedOptions = {
                        [JSON.stringify(this.value)]: this.value,
                    };
                    this.hasAnyValueSelected = true;
                } else {
                    this.hasAnyValueSelected = false;
                }

                this.selectedOptions = selectedOptions;
            },
        },
    },
    mounted() {
        if (this.autofocus) {
            window.requestAnimationFrame(() => {
                this.$refs.input.focus();
            });
        }
    },
    methods: {
        getDropDownOffset() {
            const {
                x, y, width, height,
            } = this.$refs.activator.$el.getBoundingClientRect();

            return {
                x,
                y,
                width,
                height,
            };
        },
        blur() {
            this.isFocused = false;
            this.searchResult = '';

            this.onSearch(this.searchResult);
            this.$emit('focus', false);
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onClear() {
            this.selectedOptions = {};

            this.$emit('input', this.multiselect ? [] : '');
        },
        onSelectValue(value) {
            this.$emit('input', value);
        },
        onDismiss() {
            this.isBlurringNeeded = true;
            if (document.activeElement === this.$refs.input) {
                this.$refs.input.blur();
            } else {
                this.blur();
            }
        },
        onFocus() {
            this.isBlurringNeeded = false;
            this.offset = this.getDropDownOffset();
            this.isFocused = true;

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
            this.$refs.activator.$el.addEventListener('mousemove', this.onMouseMove);

            event.preventDefault();
            event.stopPropagation();

            this.isMouseMoving = false;
        },
        onMouseUp() {
            this.$refs.activator.$el.removeEventListener('mousemove', this.onMouseMove);

            if (this.dismissible) {
                if (this.isFocused) {
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
        onClickOutside({
            event, isClickedOutside,
        }) {
            const isClickedInsideActivator = this.$refs.activator.$el.contains(event.target);

            if (isClickedOutside
                || (isClickedInsideActivator && !this.dismissible)
                || (!isClickedOutside && !this.multiselect && this.dismissible)) {
                this.isBlurringNeeded = true;

                if (document.activeElement === this.$refs.input) {
                    this.$refs.input.blur();
                } else {
                    this.blur();
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .select {
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
    }
</style>
