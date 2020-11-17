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
        :height="height"
        :details-label="informationLabel"
        @keydown.native="onKeyDown"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mounted="onMounted">
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
                    :class="classes"
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
                    <IconArrowDropdown :state="dropDownState" />
                </template>
            </InputController>
        </template>
        <FadeTransition>
            <SelectDropdown
                v-if="isReadyToRender"
                ref="menu"
                :parent-reference="$refs.activator"
                :data-cy="`${dataCy}-drop-down`"
                :fixed="fixedContent"
                :size="size"
                :multiselect="multiselect"
                :clearable="clearable"
                :fixed-content="fixedContent"
                :searchable="searchable"
                :options="options"
                :selected-options="selectedOptions"
                :search-result="searchResult"
                :is-visible="isFocused"
                @dismiss="onDismiss"
                @clear="onClear"
                @search="onSearch"
                @input="onSelectValue"
                @click-outside="onClickOutside">
                <template #placeholder="{ isVisible }">
                    <slot
                        name="placeholder"
                        :is-visible="isVisible" />
                </template>
                <template #dropdown="{ isVisible }">
                    <slot
                        name="dropdown"
                        :is-visible="isVisible"
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
            </SelectDropdown>
        </FadeTransition>
        <template #details>
            <slot name="details" />
        </template>
    </Component>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import IconArrowDropdown from '@UI/components/Icons/Arrows/IconArrowDropdown';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSelectValue from '@UI/components/Input/InputSelectValue';
import SelectDropdown from '@UI/components/Select/Dropdown/SelectDropdown';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import associatedLabelMixin from '@UI/mixins/inputs/associatedLabelMixin';

export default {
    name: 'Select',
    components: {
        FadeTransition,
        SelectDropdown,
        IconArrowDropdown,
        InputController,
        InputLabel,
        InputSelectValue,
        ErrorHint: () => import('@UI/components/Hints/ErrorHint'),
    },
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                Array,
                String,
                Number,
                Object,
            ],
            default: '',
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => [],
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
         * The flag which tells if the dropdown has fixed content to it's parent width
         */
        fixedContent: {
            type: Boolean,
            default: true,
        },
        /**
         * The dismissible flag is telling if we can toggle between active an inactive state
         */
        dismissible: {
            type: Boolean,
            default: true,
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
         * Determines if the selected value is clearable
         */
        clearable: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component has possibility of search for value
         */
        searchable: {
            type: Boolean,
            default: false,
        },
        /**
         * Search result
         */
        searchResult: {
            type: String,
            default: '',
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
            selectedOptions: {},
            isBlurringNeeded: false,
            isFocused: false,
            isReadyToRender: false,
            hasAnyValueSelected: false,
        };
    },
    computed: {
        height() {
            return this.size === SIZE.SMALL
                ? '32px'
                : '40px';
        },
        styleComponent() {
            return () => import(`@UI/components/Input/Input${toCapitalize(this.type)}Style`);
        },
        classes() {
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
    methods: {
        onMounted() {
            if (this.autofocus) {
                this.$nextTick(() => {
                    requestAnimationFrame(() => {
                        this.$refs.input.focus();
                    });
                });
            }
        },
        blur() {
            this.isFocused = false;

            this.onSearch('');
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
        onFocus(event) {
            event.preventDefault();

            this.isBlurringNeeded = false;
            this.isFocused = true;

            if (!this.isReadyToRender) {
                this.isReadyToRender = true;
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
            event.preventDefault();
        },
        onMouseUp() {
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
        },
        onClickOutside({
            event,
            isClickedOutside,
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
