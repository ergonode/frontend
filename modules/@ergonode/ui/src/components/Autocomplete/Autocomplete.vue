/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
        :search-value="searchValue"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
        :clearable="clearable"
        :multiselect="multiselect"
        :searchable="searchable"
        :wrap-value="wrapValue"
        :option-key="optionKey"
        :option-value="optionValue"
        :data-cy="dataCy"
        @focus="onFocus"
        @search="onSearch"
        @input="onValueChange">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #value>
            <slot
                name="value"
                :selected-options="selectedOptions">
                <span v-text="parsedValue" />
            </slot>
        </template>
        <template #append>
            <slot name="append" />
            <FadeTransition>
                <IconSpinner
                    v-if="isFetchingData"
                    :color="graphiteColor" />
            </FadeTransition>
        </template>
        <template #dropdownBody>
            <Preloader v-if="isPreloaderVisible" />
        </template>
        <template #noDataPlaceholder>
            <slot name="noDataPlaceholder" />
        </template>
        <template #noResultsPlaceholder>
            <slot name="noResultsPlaceholder" />
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
import {
    debounce,
} from 'debounce';

export default {
    name: 'Autocomplete',
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
         * Wrapping selected values
         */
        wrapValue: {
            type: Boolean,
            default: false,
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
         * The params of autocomplete request
         */
        params: {
            type: Object,
            default: () => ({}),
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
        /**
         * Listen for custom event to trigger fetch data
         */
        customFetchEvent: {
            type: String,
            default: '',
        },
        /**
         * The data model of sorted column
         */
        sortOrder: {
            type: Object,
            default: null,
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
    },
    data() {
        return {
            options: [],
            allOptions: [],
            searchValue: '',
            isFetchingData: false,
            onDebounceGetOptions: null,
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
        isPreloaderVisible() {
            return this.isFetchingData && this.allOptions.length === 0;
        },
    },
    async created() {
        this.onDebounceGetOptions = debounce(this.getOptions, 500);

        await this.getOptions();

        this.allOptions = this.options;

        if (this.customFetchEvent !== '') {
            document.documentElement.addEventListener(
                this.customFetchEvent,
                this.onCustomFetchEvent,
            );
        }
    },
    beforeDestroy() {
        if (this.customFetchEvent !== '') {
            document.documentElement.removeEventListener(
                this.customFetchEvent,
                this.onCustomFetchEvent,
            );
        }
    },
    methods: {
        onSearch(value) {
            if (this.searchValue !== value) {
                this.searchValue = value;

                if (this.searchValue === '') {
                    this.options = this.allOptions;
                } else {
                    this.onDebounceGetOptions();
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
        async onCustomFetchEvent() {
            await this.getOptions();

            this.allOptions = this.options;
        },
        async getOptions() {
            try {
                this.isFetchingData = true;

                const config = {
                    params: {
                        search: this.searchValue,
                        ...this.params,
                    },
                };

                if (this.sortOrder) {
                    config.params.order = this.sortOrder.order;
                    config.params.field = this.sortOrder.field;
                }

                const options = await this.$axios.$get(this.href, config);

                if (this.additionalStaticOptions.length) {
                    const lowerCaseSearchValue = this.searchValue.toLowerCase();

                    this.options = [
                        ...options,
                        ...this.additionalStaticOptions.filter(({
                            code,
                        }) => code.toLowerCase().includes(lowerCaseSearchValue)),
                    ];
                } else {
                    this.options = options;
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
