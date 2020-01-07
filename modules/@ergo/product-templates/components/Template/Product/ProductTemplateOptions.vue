/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :value="localValue"
        :solid="true"
        :clearable="true"
        :regular="true"
        :label="label"
        :placeholder="placeholder"
        :multiselect="multiselect"
        :disabled="disabled"
        :error-messages="isError ? errorMessages : null"
        :is-information-label="false"
        :required="required"
        :options="options"
        @focus="onFocusChange"
        @input="onValueChange" />
</template>

<script>
import productTemplateElementMixin from '@Templates/mixins/productTemplateElementMixin';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';

export default {
    name: 'ProductTemplateOptions',
    mixins: [productTemplateElementMixin],
    components: {
        TranslationSelect,
    },
    props: {
        options: {
            type: Array,
            required: true,
        },
        multiselect: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFocused: false,
            parsedValue: '',
        };
    },
    watch: {
        parsedOptions: {
            immediate: true,
            handler() {
                this.initializeValues(this.value);
            },
        },
    },
    methods: {
        initializeValues(value) {
            if (Array.isArray(value)) {
                this.localValue = value.map((val) => ({
                    id: val,
                    key: val,
                    value: this.options.find((option) => option.key === val).value,
                }));
            } else if (value) {
                this.localValue = this.options.find((option) => option.key === value);
            } else {
                this.localValue = this.multiselect ? [] : {
                    id: '', key: '', value: '', hint: '',
                };
            }
        },
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
        onValueChange(value) {
            this.localValue = value;

            if (Array.isArray(value)) {
                this.debounceFunc(value.length > 0 ? value.map((val) => val.key) : '');
            } else {
                this.debounceFunc(value.key);
            }
        },
    },
};
</script>
