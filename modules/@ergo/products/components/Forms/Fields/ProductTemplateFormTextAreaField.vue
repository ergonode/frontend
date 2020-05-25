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
                <TextArea
                    :style="{ height: '100%' }"
                    :value="fieldData"
                    solid
                    regular
                    resize="none"
                    :label="label"
                    :placeholder="properties.placeholder"
                    :error-messages="errorMessages"
                    :required="properties.required"
                    :disabled="disabled"
                    :description="properties.hint"
                    @focus="onFocus"
                    @input="onValueChange">
                    <template #informationLabel>
                        <div />
                    </template>
                </TextArea>
            </template>
        </FormValidatorField>
    </ProductTemplateFormField>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductTemplateFormField from '@Products/components/Forms/Fields/ProductTemplateFormField';
import TextArea from '@Core/components/Inputs/TextArea';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';

export default {
    name: 'ProductTemplateFormTextAreaField',
    components: {
        ProductTemplateFormField,
        TextArea,
        FormValidatorField,
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
    computed: {
        ...mapState('product', {
            draft: state => state.draft,
        }),
        fieldData() {
            const { attribute_code } = this.properties;

            return this.draft[this.languageCode][attribute_code] || '';
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
    },
    methods: {
        ...mapActions('product', [
            'setDraftValue',
        ]),
        onFocus(isFocused) {
            if (!isFocused) {
                this.$emit('input', {
                    fieldKey: this.fieldKey,
                    languageCode: this.languageCode,
                    productId: this.$route.params.id,
                    elementId: this.properties.attribute_id,
                    value: this.fieldData,
                });
            }
        },
        onValueChange(value) {
            this.setDraftValue({
                languageCode: this.languageCode,
                key: this.properties.attribute_code,
                value,
            });
        },
    },
};
</script>
