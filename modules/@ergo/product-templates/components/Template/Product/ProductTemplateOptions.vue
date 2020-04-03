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
        :error-messages="errorMessages"
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
    components: {
        TranslationSelect,
    },
    mixins: [productTemplateElementMixin],
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
        };
    },
    watch: {
        options: {
            immediate: true,
            handler() {
                this.initializeValues(this.value);
            },
        },
    },
    methods: {
        initializeValues(value) {
            if (Array.isArray(value)) {
                this.localValue = value.map((val) => {
                    const option = this.options.find(opt => opt.id === val) || {};

                    return {
                        id: val,
                        key: option.key || val,
                        value: option.value || null,
                    };
                });
            } else if (value) {
                this.localValue = this.options.find(option => option.id === value);
            } else {
                this.localValue = this.multiselect ? [] : null;
            }
        },
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
        onValueChange(value) {
            this.localValue = value;

            if (Array.isArray(value)) {
                this.debounceFunc(value.length > 0 ? value.map(val => val.id) : '');
            } else {
                this.debounceFunc(value.id);
            }
        },
    },
};
</script>
