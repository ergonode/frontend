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
                <RichTextEditor
                    v-if="isRTEEditor"
                    :disabled="disabled"
                    :required="properties.required"
                    :placeholder="properties.placeholder"
                    :error-messages="errorMessages"
                    :label="label"
                    :value="fieldData"
                    @blur="onRTEValueChange">
                    <template #append>
                        <InfoHint
                            v-if="properties.hint"
                            :hint="properties.hint" />
                    </template>
                </RichTextEditor>
                <TextArea
                    v-else
                    :value="fieldData"
                    resize="none"
                    :label="label"
                    :placeholder="properties.placeholder"
                    :error-messages="errorMessages"
                    :required="properties.required"
                    :disabled="disabled"
                    @focus="onFocus"
                    @input="onValueChange">
                    <template #append>
                        <InfoHint
                            v-if="properties.hint"
                            :hint="properties.hint" />
                    </template>
                    <template #details>
                        <div />
                    </template>
                </TextArea>
            </template>
        </FormValidatorField>
    </ProductTemplateFormField>
</template>

<script>
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';
import InfoHint from '@Core/components/Hints/InfoHint';
import RichTextEditor from '@Core/components/Inputs/RichTextEditor/RichTextEditor';
import TextArea from '@Core/components/Inputs/TextArea';
import ProductTemplateFormField from '@Products/components/Form/Field/ProductTemplateFormField';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormTextAreaField',
    components: {
        ProductTemplateFormField,
        TextArea,
        RichTextEditor,
        FormValidatorField,
        InfoHint,
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
            const {
                attribute_code,
            } = this.properties;

            return this.draft[this.languageCode][attribute_code] || '';
        },
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
        isRTEEditor() {
            return this.properties.parameters.rich_edit;
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
        onRTEValueChange(value) {
            this.onValueChange(value);
            this.onFocus(false);
        },
    },
};
</script>
