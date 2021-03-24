/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :value="parsedValue"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        :multiselect="true"
        :clearable="true"
        :options="options"
        :error-messages="errorMessages"
        @focus="onFocus"
        @input="onValueChange">
        <template #append>
            <IconSpinner
                v-if="isFetchingData"
                :fill-color="graphiteColor" />
        </template>
    </TranslationSelect>
</template>

<script>
import {
    getOption,
} from '@Attributes/services/attribute';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import TranslationSelect from '@UI/components/Select/TranslationSelect';

export default {
    name: 'AttributeMultiSelectFormField',
    components: {
        TranslationSelect,
        IconSpinner,
    },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        attribute: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            required: true,
        },
        errorMessages: {
            type: String,
            default: '',
        },
    },
    async fetch() {
        const options = await getOption({
            $axios: this.$axios,
            id: this.attribute.id,
        });

        this.options = options.map((option) => {
            let value = '';
            let hint = '';

            if (option.label) {
                value = option.label[this.languageCode];
                hint = `#${option.code} ${this.languageCode}`;
            }

            return {
                id: option.id,
                key: option.code,
                value,
                hint,
            };
        });

        this.isFetchingData = false;
    },
    data() {
        return {
            isFetchingData: true,
            options: [],
        };
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
        label() {
            return this.attribute.label[this.languageCode] || `#${this.attribute.code}`;
        },
        placeholder() {
            return this.attribute.placeholder[this.languageCode];
        },
        hint() {
            return this.attribute.hint[this.languageCode];
        },
        parsedValue() {
            return this.options.filter(option => this.value.some(id => option.id === id));
        },
    },
    mounted() {
        this.onValueChange([]);
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                key: this.attribute.id,
                value: value.map(option => option.id),
                languageCode: this.languageCode,
            });
        },
        onFocus(isFocused) {
            if (!isFocused) {
                this.$emit('blur', {
                    key: this.attribute.id,
                    value: this.value,
                    languageCode: this.languageCode,
                });
            }
        },
    },
};
</script>
