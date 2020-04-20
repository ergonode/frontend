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
                solid
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
import { mapState, mapActions } from 'vuex';
import { isObject, isEmpty } from '@Core/models/objectWrapper';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';

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
        ...mapState('attribute', {
            isMultilingual: state => state.isMultilingual,
        }),
        translationOptionValue() {
            if (!this.isMultilingual) {
                if (isObject(this.option.value)) {
                    return !isEmpty(this.option.value)
                        ? this.option.value[Object.keys(this.option.value)[0]]
                        : '';
                }
                return this.option.value;
            }

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
