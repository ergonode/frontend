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
            :value="fieldData"
            :label="label"
            :required="properties.required"
            :disabled="disabled"
            :multiple="true"
            height="100%"
            @input="onValueChange" />
    </ProductTemplateFormField>
</template>

<script>
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import ProductTemplateFormField from '@Products/components/Form/Field/ProductTemplateFormField';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormGalleryField',
    components: {
        UploadImageFile,
        ProductTemplateFormField,
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
            const {
                attribute_code,
            } = this.properties;

            return this.draft[this.languageCode][attribute_code] || [];
        },
        parameter() {
            if (!this.properties.parameters) return null;

            const [
                key,
            ] = Object.keys(this.properties.parameters);

            return this.properties.parameters[key];
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
    },
    methods: {
        ...mapActions('product', [
            'setDraftValue',
        ]),
        onValueChange(value) {
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
