/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormValidatorField :field-key="fieldKey">
        <template #validator="{ errorMessages }">
            <TextField
                :value="translationOptionValue"
                :label="option.key"
                :size="smallSize"
                :disabled="disabled"
                :error-messages="errorMessages"
                @input="onOptionValueChange" />
        </template>
    </FormValidatorField>
</template>

<script>
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';
import {
    SIZE,
} from '@Core/defaults/theme';
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
        fieldKey() {
            return `option_${this.languageCode}_${this.index}`;
        },
        smallSize() {
            return SIZE.SMALL;
        },
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
        onOptionValueChange(value) {
            this.setOptionValueForLanguageCode({
                index: this.index,
                languageCode: this.languageCode,
                value,
                id: this.option.id,
            });
        },
    },
};
</script>
