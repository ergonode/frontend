/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="selectedOptions"
        :options="options"
        :type="type"
        :alignment="alignment"
        :size="size"
        :fixed-content="fixedContent"
        :dismissible="dismissible"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errorMessages"
        :search-result="searchValue"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
        :clearable="clearable"
        :multiselect="multiselect"
        :searchable="searchable"
        :data-cy="dataCy"
        @focus="onFocus"
        @search="onSearch"
        @input="onValueChange">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #value>
            <span v-text="parsedValue" />
        </template>
        <template #append>
            <slot name="append" />
            <FadeTransition>
                <IconSpinner
                    v-if="isFetchingData"
                    :color="graphiteColor" />
            </FadeTransition>
        </template>
        <template #placeholder="{ isVisible }">
            <slot
                name="placeholder"
                :is-visible="isVisible" />
        </template>
        <template #details>
            <slot name="details" />
        </template>
        <template #option="{ option, isSelected }">
            <slot
                name="option"
                :option="option"
                :is-selected="isSelected">
                <ListElementAction
                    v-if="multiselect"
                    :size="size">
                    <CheckBox :value="isSelected" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :size="size"
                        :title="option.label || `#${option.code}`" />
                </ListElementDescription>
            </slot>
        </template>
    </Select>
</template>

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import Select from '@UI/components/Select/Select';
import FadeTransition from '@UI/components/Transitions/FadeTransition';

import data from './data';

export default {
    name: 'Autocomplete',
    components: {
        Select,
        IconSpinner,
        FadeTransition,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        CheckBox,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
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
         * URL of backend endpoint
         */
        href: {
            type: String,
            required: true,
        },
        /**
         * The type of filter at which options will be narrowed
         */
        filterType: {
            type: String,
            default: '',
        },
        /**
         * Array of the static options which are not coming from options request
         */
        additionalStaticOptions: {
            type: Array,
            default: () => [],
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
            options: [],
            allOptions: [],
            searchValue: '',
            isFetchingData: false,
        };
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
        selectedOptions() {
            if (Array.isArray(this.value)) {
                return this.allOptions.filter(option => this.value.some(id => option.id === id));
            }

            return this.allOptions.find(option => option.id === this.value);
        },
        parsedValue() {
            if (Array.isArray(this.selectedOptions)) {
                return this.selectedOptions.map(option => option.label || `#${option.code}`).join(', ');
            }

            if (this.selectedOptions) {
                const {
                    label,
                    code,
                } = this.selectedOptions;

                return label || `#${code}`;
            }

            return '';
        },
    },
    async created() {
        await this.getOptions();

        this.allOptions = this.options;
    },
    methods: {
        onSearch(value) {
            if (this.searchValue !== value) {
                this.searchValue = value;

                if (this.searchValue === '') {
                    this.options = this.allOptions;
                } else {
                    this.getOptions();
                }
            }
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(value) {
            if (Array.isArray(value)) {
                const ids = value.map(({
                    id,
                }) => id);

                this.$emit('input', ids);
            } else if (value) {
                this.$emit('input', value.id);
            } else {
                this.$emit('input', value);
            }
        },
        async getOptions() {
            try {
                this.isFetchingData = true;

                const options = await this.$axios.$get(this.href, {
                    params: {
                        search: this.searchValue,
                        type: this.filterType,
                    },
                });

                if (this.additionalStaticOptions.length) {
                    const lowerCaseSearchValue = this.searchValue.toLowerCase();

                    this.options = [
                        ...options,
                        ...this.additionalStaticOptions.filter(({
                            code,
                        }) => code.toLowerCase().includes(lowerCaseSearchValue)),
                    ];
                }

                this.isFetchingData = false;
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.isFetchingData = false;

                this.$emit('fetch-error');
            }
        },
    },
};
</script>
