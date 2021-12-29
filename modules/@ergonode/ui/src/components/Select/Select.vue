/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputUUIDProvider>
        <template #default="{ uuid }">
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
                @mouseup="onMouseUp">
                <template #activator="{ inputReference }">
                    <InputController>
                        <!--
                            @slot Prepend element - icon recommended
                        -->
                        <slot name="prepend" />
                        <InputSelectValue
                            :data-cy="`${dataCy}-value`"
                            :size="size"
                            :alignment="alignment"
                            :disabled="disabled"
                            :value="presentingValue"
                            :wrap="wrapValue">
                            <template #value>
                                <slot name="value" />
                            </template>
                        </InputSelectValue>
                        <input
                            :id="uuid"
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
                            :for="uuid"
                            :required="required"
                            :size="size"
                            :floating="isFocused || hasAnyValueSelected"
                            :focused="isFocused"
                            :disabled="disabled"
                            :error="isError"
                            :label="label" />
                        <!--
                            @slot Append element - icon recommended
                        -->
                        <slot name="append" />
                        <ErrorHint
                            v-if="isError"
                            :hint="errorMessages" />
                        <IconArrowDropdown :state="dropDownState" />
                    </InputController>
                    <SelectDropdown
                        v-if="isReadyToRender"
                        ref="menu"
                        :value="value"
                        :parent-reference="inputReference"
                        :data-cy="`${dataCy}-dropdown`"
                        :fixed="fixedContent"
                        :size="size"
                        :multiselect="multiselect"
                        :clearable="clearable"
                        :fixed-content="fixedContent"
                        :searchable="searchable"
                        :options="options"
                        :search-value="searchValue"
                        :option-key="optionKey"
                        :option-value="optionValue"
                        :is-visible="isFocused"
                        @dismiss="onDismiss"
                        @clear="onClear"
                        @search="onSearch"
                        @input="onSelectValue"
                        @click-outside="onClickOutside">
                        <template #body>
                            <slot name="dropdownBody" />
                        </template>
                        <template #noDataPlaceholder>
                            <slot name="noDataPlaceholder" />
                        </template>
                        <template #noResultsPlaceholder>
                            <slot name="noResultsPlaceholder" />
                        </template>
                        <template #dropdown>
                            <slot
                                name="dropdown"
                                :on-select-value="onSelectValue"
                                :on-apply="onDismiss"
                                :on-clear="onClear" />
                        </template>
                        <template #item="{ index, item, isSelected, isSmallSize }">
                            <slot
                                name="option"
                                :option="item"
                                :is-selected="isSelected"
                                :is-small-size="isSmallSize"
                                :index="index" />
                        </template>
                    </SelectDropdown>
                </template>
                <template #details>
                    <!--
                        @slot Details element - text recommended
                    -->
                    <slot name="details" />
                </template>
            </Component>
        </template>
    </InputUUIDProvider>
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
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import InputUnderlineStyle from '@UI/components/Input/InputUnderlineStyle';
import SelectDropdown from '@UI/components/Select/Dropdown/SelectDropdown';

export default {
    name: 'Select',
    components: {
        InputSolidStyle,
        SelectDropdown,
    },
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
         * Wrapping selected values
         */
        wrapValue: {
            type: Boolean,
            default: false,
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
         * Search value
         */
        searchValue: {
            type: String,
            default: '',
        },
        /**
         * The key of the option
         */
        optionKey: {
            type: String,
            default: '',
        },
        /**
         * The key of the value
         */
        optionValue: {
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
            isBlurringNeeded: false,
            isFocused: false,
            isReadyToRender: false,
            hasAnyValueSelected: false,
        };
    },
    computed: {
        presentingValue() {
            if (!this.value) {
                return '';
            }

            let value = [
                this.value,
            ];

            if (this.multiselect) {
                value = this.value;
            }

            if (this.optionValue || this.optionKey) {
                return value.map(item => item[this.optionValue] || `#${item[this.optionKey]}`).join(', ');
            }

            return value.join(', ');
        },
        height() {
            if (this.wrapValue) {
                return '';
            }

            return this.size === SIZE.SMALL
                ? '32px'
                : '40px';
        },
        styleComponent() {
            if (this.type === INPUT_TYPE.SOLID) {
                return InputSolidStyle;
            }

            return InputUnderlineStyle;
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
        placeholderValue() {
            if (!this.hasAnyValueSelected || (this.label && !this.isFocused)) return null;

            return this.placeholder;
        },
        isError() {
            return Boolean(this.errorMessages);
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                const isArray = Array.isArray(this.value);

                if (isArray && this.value.length) {
                    this.hasAnyValueSelected = true;
                } else {
                    this.hasAnyValueSelected = Boolean(!isArray
                        && (this.value || this.value === 0));
                }
            },
        },
    },
    mounted() {
        if (this.autofocus) {
            this.$refs.input.focus();
        }
    },
    methods: {
        blur() {
            this.isFocused = false;

            this.onSearch('');
            this.$emit('focus', false);
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onClear() {
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
