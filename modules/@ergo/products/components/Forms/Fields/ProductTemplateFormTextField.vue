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
                <TextField
                    :value="fieldData.value"
                    solid
                    regular
                    :label="label"
                    :placeholder="properties.placeholder"
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
                </TextField>
            </template>
        </FormValidatorField>
    </ProductTemplateFormField>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { debounce } from 'debounce';
import { fieldDataCompose } from '@Products/models/productMapper';
import ProductTemplateFormField from '@Products/components/Forms/Fields/ProductTemplateFormField';
import TextField from '@Core/components/Inputs/TextField';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';

export default {
    name: 'ProductTemplateFormTextField',
    components: {
        ProductTemplateFormField,
        TextField,
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

            return getMappedValue({
                data: this.data[attribute_code],
                draft: this.draft[this.languageCode][attribute_code],
                defaultValue: '',
            });
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
        this.debounceValueChange = debounce(this.onValueChange, 500);
    },
    methods: {
        ...mapActions('product', [
            'setDraftValue',
        ]),
        onValueChange(value) {
            console.log(value);
            this.setDraftValue({
                languageCode: this.languageCode,
                key: this.properties.attribute_code,
                value,
            });

            this.$emit('input', {
                fieldKey: this.fieldKey,
                languageCode: this.languageCode,
                productId: this.$route.params.id,
                elementId: this.properties.attribute_id,
                value,
            });
        },
    },
};
</script>
