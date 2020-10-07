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
    GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import Select from '@Core/components/Select/Select';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'LazySelect',
    components: {
        Select,
        IconSpinner,
        FadeTransition,
    },
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
        optionKey: {
            type: String,
            default: '',
        },
        fetchOptionsRequest: {
            type: Function,
            required: true,
        },
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
                this.$emit('fetchedOptions', options);
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
