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
        :error-messages="isError ? [' '] : null"
        :required="required"
        :options="parsedOptions"
        @focus="onFocusChange"
        @input="onValueChange">
    </TranslationSelect>
</template>

<script>
import productTemplateElementMixin from '~/mixins/product/productTemplateElementMixin';
import TranslationSelect from '~/components/Inputs/Select/TranslationSelect';

export default {
    name: 'ProductTemplateOptions',
    mixins: [productTemplateElementMixin],
    components: {
        TranslationSelect,
    },
    props: {
        options: {
            type: Object,
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
    computed: {
        parsedOptions() {
            const optionKeys = Object.keys(this.options);

            return optionKeys.map((key) => ({ key, value: this.options[key] }));
        },
    },
    methods: {
        initializeValues(value) {
            this.localValue = value;
        },
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
        onValueChange(value) {
            if (Array.isArray(value)) {
                this.localValue = value;
            } else {
                this.localValue = value.key;
            }

            this.debounceFunc(this.localValue);
        },
    },
};
</script>
