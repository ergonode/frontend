/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <FormValidatorField :field-key="fieldKey">
            <template #validator="{ errorMessages }">
                <DatePicker
                    :value="fieldData.value"
                    solid
                    regular
                    :label="label"
                    :placeholder="properties.placeholder"
                    :foramt="parameter"
                    :error-messages="errorMessages"
                    :is-information-label="false"
                    :required="properties.required"
                    :disabled="disabled"
                    :description="properties.hint"
                    @input="debounceValueChange">
                    <template #append>
                        <TextFieldSuffix
                            v-if="parameter"
                            :suffix="parameter" />
                    </template>
                </DatePicker>
            </template>
        </FormValidatorField>
    </ProductTemplateFormField>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from 'debounce';
import { fieldDataCompose } from '@Products/models/productMapper';
import { format as formatDate, parse as parseDate } from 'date-fns';
import { DEFAULT_FORMAT } from '@Core/models/calendar/calendar';
import ProductTemplateFormField from '@Products/components/Forms/Fields/ProductTemplateFormField';
import DatePicker from '@Core/components/Inputs/DatePicker/DatePicker';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';

export default {
    name: 'ProductTemplateFormDateField',
    components: {
        ProductTemplateFormField,
        DatePicker,
        FormValidatorField,
        TextFieldSuffix: () => import('@Core/components/Inputs/TextFieldSuffix'),
    },
    props: {
        size: {
            type: Object,
            default: () => ({}),
        },
        position: {
            type: Object,
            default: () => ({}),
        },
        parameters: {
            type: Object,
            default: () => ({}),
        },
        properties: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            debounceValueChange: null,
        };
    },
    computed: {
        ...mapState('product', {
            data: state => state.data,
            draft: state => state.draft,
        }),
        fieldData() {
            const { attribute_code } = this.properties;
            const check = (data, draftValue) => data !== draftValue;
            const getMappedValue = fieldDataCompose(check);
            const { isDraft, value } = getMappedValue({
                data: this.data[attribute_code],
                draft: this.draft[attribute_code],
                defaultValue: '',
            });

            return {
                isDraft,
                value: parseDate(value, DEFAULT_FORMAT, new Date()),
            };
        },
        parameter() {
            if (!this.properties.parameters) return null;

            const [key] = Object.keys(this.properties.parameters);

            return this.properties.parameters[key];
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
    },
    created() {
        this.debounceValueChange = debounce(value => this.onValueChange(value));
    },
    methods: {
        ...mapActions('product', [
            'setDraftValue',
        ]),
        onValueChange(value) {
            const date = formatDate(value, DEFAULT_FORMAT);

            this.setDraftValue({
                key: this.properties.attribute_code,
                value,
            });

            this.$emit('input', {
                fieldKey: this.fieldKey,
                languageCode: this.languageCode,
                productId: this.$route.params.id,
                elementId: this.properties.attribute_id,
                value: date,
            });
        },
    },
};
</script>
