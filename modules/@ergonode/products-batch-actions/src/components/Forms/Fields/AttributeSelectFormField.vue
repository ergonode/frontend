/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :value="value"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        :options="options"
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
    name: 'AttributeSelectFormField',
    components: {
        TranslationSelect,
        IconSpinner,
    },
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
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', {
                key: this.attribute.id,
                value,
                languageCode: this.languageCode,
            });
        },
    },
};
</script>
