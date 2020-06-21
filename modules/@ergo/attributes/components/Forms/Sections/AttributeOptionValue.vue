/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormValidatorField :field-key="`option_${languageCode}_${index}`">
        <template #validator="{ errorMessages }">
            <TextField
                :value="translationOptionValue"
                :label="option.key"
                small
                :disabled="disabled"
                :error-messages="errorMessages"
                @input="value => setOptionValueForLanguageCode({
                    index,
                    languageCode,
                    value,
                    id: option.id,
                })" />
        </template>
    </FormValidatorField>
</template>

<script>
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeOptionValue',
    components: {
        FormValidatorField,
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    props: {
        index: {
            type: String,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
        option: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        translationOptionValue() {
            if (this.option.value) {
                return this.option.value[this.languageCode] || '';
            }

            return '';
        },
    },
    methods: {
        ...mapActions('attribute', [
            'setOptionValueForLanguageCode',
        ]),
    },
};
</script>
