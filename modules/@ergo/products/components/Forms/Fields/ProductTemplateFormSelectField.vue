/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position"
        :draft="fieldData.isDraft">
        <FormValidatorField :field-key="fieldKey">
            <template #validator="{ errorMessages }">
                <TranslationSelect
                    :value="fieldData.value"
                    solid
                    regular
                    :clearable="true"
                    :label="label"
                    :options="options"
                    :placeholder="properties.placeholder"
                    :error-messages="errorMessages"
                    :is-information-label="false"
                    :required="properties.required"
                    :disabled="disabled"
                    :description="properties.hint"
                    @input="debounceValueChange" />
            </template>
        </FormValidatorField>
    </ProductTemplateFormField>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from 'debounce';
import { fieldDataCompose } from '@Products/models/productMapper';
import ProductTemplateFormField from '@Products/components/Forms/Fields/ProductTemplateFormField';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';

export default {
    name: 'ProductTemplateFormSelectField',
    components: {
        ProductTemplateFormField,
        TranslationSelect,
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
            if (!this.hasOptions) {
                return {
                    value: null,
                    isDraft: false,
                };
            }

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
                value: {
                    id: value,
                    code: this.properties.options[value].code,
                    value: this.properties.options[value].label,
                    hint: this.properties.options[value].label ? `#${this.properties.options[value].code}` : '',
                },
            };
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
        hasOptions() {
            return typeof this.properties.options !== 'undefined';
        },
        options() {
            if (!this.hasOptions) return [];

            return Object.keys(this.properties.options).map(id => ({
                id,
                code: this.properties.options[id].code,
                value: this.properties.options[id].label,
                hint: this.properties.options[id].label ? `#${this.properties.options[id].code}` : '',
            }));
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
            this.setDraftValue({
                key: this.properties.attribute_code,
                value: value.id,
            });

            this.$emit('input', {
                fieldKey: this.fieldKey,
                languageCode: this.languageCode,
                productId: this.$route.params.id,
                elementId: this.properties.attribute_id,
                value: value.id,
            });
        },
    },
};
</script>
