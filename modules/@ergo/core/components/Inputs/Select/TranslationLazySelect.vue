/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LazySelect
        :value="localValue"
        :solid="solid"
        :underline="underline"
        :fixed-content="fixedContent"
        :left-alignment="leftAlignment"
        :center-alignment="centerAlignment"
        :dismissible="dismissible"
        :label="label"
        :placeholder="placeholder"
        :description="description"
        :error-messages="errorMessages"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
        :clearable="clearable"
        :multiselect="multiselect"
        :small="small"
        :regular="regular"
        :searchable="searchable"
        :fetch-options-request="fetchOptionsRequest"
        :data-cy="dataCy"
        @focus="onFocus"
        @search="onSearch"
        @input="onValueChange"
        @fetchedOptions="onFetchedOptions">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #value>
            <span v-text="parsedValue" />
        </template>
        <template #details>
            <slot name="details" />
        </template>
        <template #option="{ option, isSelected }">
            <slot
                name="option"
                :option="option"
                :selected="isSelected">
                <ListElementAction
                    v-if="multiselect"
                    :small="small">
                    <CheckBox :value="isSelected" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :small="small"
                        :hint="option.hint"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </slot>
        </template>
    </LazySelect>
</template>

<script>
import CheckBox from '@Core/components/Inputs/CheckBox';
import LazySelect from '@Core/components/Inputs/Select/LazySelect';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';

export default {
    name: 'TranslationLazySelect',
    components: {
        LazySelect,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        CheckBox,
    },
    props: {
        value: {
            type: [Array, String, Number, Object],
            default: '',
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
        searchable: {
            type: Boolean,
            default: false,
        },
        optionKey: {
            type: String,
            default: 'id',
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
            localValue: null,
        };
    },
    computed: {
        parsedValue() {
            if (!this.localValue) return null;
            if (Array.isArray(this.localValue)) {
                return this.localValue.map(val => val.value || `#${val.key}`).join(', ');
            }

            return this.localValue.value || this.localValue.key;
        },
    },
    methods: {
        onSearch(value) {
            this.$emit('search', value);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(value) {
            this.localValue = value;

            this.$emit('input', Array.isArray(value)
                ? value.map(option => option[this.optionKey])
                : value[this.optionKey]);
        },
        onFetchedOptions(options) {
            if (Array.isArray(this.value) && this.value.length) {
                this.localValue = options.filter(
                    option => this.value.some(
                        key => option[this.optionKey] === key,
                    ),
                );
            } else {
                this.localValue = options.find(option => option[this.optionKey] === this.value);
            }
        },
    },
};
</script>
