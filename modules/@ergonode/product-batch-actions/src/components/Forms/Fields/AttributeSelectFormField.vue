/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="parsedValue"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        :options="options"
        :error-messages="errorMessages"
        :clearable="true"
        option-key="key"
        option-value="value"
        @focus="onFocus"
        @input="onValueChange">
        <template #append>
            <IconSpinner
                v-if="isFetchingData"
                :fill-color="graphiteColor" />
        </template>
    </Select>
</template>

<script>
import {
    getOption,
} from '@Attributes/services';
import {
    getMappedTranslationArrayOptions,
} from '@Core/models/mappers/translationsMapper';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'AttributeSelectFormField',
    props: {
        value: {
            type: String,
            default: '',
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

        this.options = getMappedTranslationArrayOptions({
            options,
            languageCode: this.languageCode,
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
            if (!this.value) {
                return null;
            }

            return this.options.find(option => option.id === this.value);
        },
    },
    mounted() {
        this.onValueChange('');
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                key: this.attribute.id,
                value: value ? value.id : '',
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
