/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <RichTextEditor
            v-if="isRTEEditor"
            :disabled="disabled"
            height="100%"
            :required="properties.required"
            :placeholder="properties.placeholder"
            :error-messages="errors[fieldKey]"
            :label="label"
            :value="localValue"
            @blur="onRTEValueChange">
            <template #append>
                <InfoHint
                    v-if="properties.hint"
                    :hint="properties.hint" />
            </template>
        </RichTextEditor>
        <TextArea
            v-else
            :value="localValue"
            resize="none"
            height="100%"
            :label="label"
            :placeholder="properties.placeholder"
            :error-messages="errors[fieldKey]"
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
    </ProductTemplateFormField>
</template>

<script>
import InfoHint from '@Core/components/Hints/InfoHint';
import RichTextEditor from '@Core/components/Inputs/RichTextEditor/RichTextEditor';
import TextArea from '@Core/components/Inputs/TextArea';
import ProductTemplateFormField from '@Products/components/Form/Field/ProductTemplateFormField';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormTextAreaField',
    components: {
        ProductTemplateFormField,
        TextArea,
        RichTextEditor,
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
        properties: {
            type: Object,
            default: () => ({}),
        },
        errors: {
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
            localValue: '',
        };
    },
    computed: {
        ...mapState('product', [
            'draft',
        ]),
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
    watch: {
        languageCode: {
            immediate: true,
            handler() {
                this.localValue = this.fieldData;
            },
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused && this.fieldData !== this.localValue) {
                this.$emit('input', {
                    fieldKey: this.fieldKey,
                    languageCode: this.languageCode,
                    productId: this.$route.params.id,
                    elementId: this.properties.attribute_id,
                    code: this.properties.attribute_code,
                    value: this.localValue,
                });
            }
        },
        onValueChange(value) {
            this.localValue = value;
        },
        onRTEValueChange(value) {
            this.localValue = value;

            this.onFocus(false);
        },
    },
};
</script>
