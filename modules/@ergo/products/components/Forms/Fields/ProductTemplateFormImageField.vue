/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <UploadImageFile
            :style="{ height: '100%' }"
            :value="fieldData.value"
            :label="label"
            :required="properties.required"
            :disabled="disabled"
            height="100%" />
    </ProductTemplateFormField>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { debounce } from 'debounce';
import { fieldDataCompose } from '@Products/models/productMapper';
import ProductTemplateFormField from '@Products/components/Forms/Fields/ProductTemplateFormField';
import UploadImageFile from '@Core/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'ProductTemplateFormNumericField',
    components: {
        ProductTemplateFormField,
        UploadImageFile,
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
                draft: this.draft[attribute_code],
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
        this.debounceValueChange = debounce(value => this.onValueChange(value));
    },
    methods: {
        ...mapActions('product', [
            'setDraftValue',
        ]),
        onValueChange(value) {
            this.setDraftValue({
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
