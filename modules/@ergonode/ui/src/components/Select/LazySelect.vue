/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="value"
        :options="options"
        :type="type"
        :alignment="alignment"
        :size="size"
        :fixed-content="fixedContent"
        :dismissible="dismissible"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errorMessages"
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
            <slot name="value" />
        </template>
        <template #append>
            <slot name="append" />
            <FadeTransition>
                <IconSpinner
                    v-if="isFetchingOptions"
                    :color="graphiteColor" />
            </FadeTransition>
        </template>
        <template #details>
            <slot name="details" />
        </template>
        <template #option="{ option, isSelected }">
            <slot
                name="option"
                :option="option"
                :is-selected="isSelected" />
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
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import Select from '@UI/components/Select/Select';
import FadeTransition from '@UI/components/Transitions/FadeTransition';

export default {
    name: 'LazySelect',
    components: {
        Select,
        IconSpinner,
        FadeTransition,
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
         * Declaration of options request
         */
        fetchOptionsRequest: {
            type: Function,
            required: true,
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
            isFetchingOptions: false,
        };
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
    },
    created() {
        if (this.fetchOptionsRequest) {
            this.isFetchingOptions = true;
            this.fetchOptionsRequest().then(({
                options,
            }) => {
                this.options = options;
                this.isFetchingOptions = false;
                this.$emit('fetched-options', options);
            });
        }
    },
    methods: {
        onSearch(value) {
            this.$emit('search', value);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
