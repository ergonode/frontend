/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form>
            <FormGroup>
                <TextField
                    :value="parsedValue('label')"
                    solid
                    label="Attribute name"
                    regular
                    :error-messages="errorLabelMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) =>
                        setTranslationPropertyValue(value, 'label', isMultilingual)" />
                <TextArea
                    v-if="hasPlaceholder"
                    :value="parsedValue('placeholder')"
                    solid
                    label="Placeholder"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorPlaceholderMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) =>
                        setTranslationPropertyValue(value, 'placeholder', isMultilingual)" />
                <TextArea
                    :value="parsedValue('hint')"
                    solid
                    label="Tooltip for writers"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorHintMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) =>
                        setTranslationPropertyValue(value, 'hint', isMultilingual)" />
                <template v-if="hasOptions">
                    <Divider />
                    <AttributeOptionValues
                        :language-code="languageCode"
                        :disabled="!isUserAllowedToUpdate" />
                </template>
            </FormGroup>
        </Form>
    </Card>
</template>

<script>
import { mapState } from 'vuex';
import { hasPlaceholder, hasOptions } from '@Attributes/models/attributeTypes';
import AttributeOptionValues from '@Attributes/components/Forms/Sections/AttributeOptionValues';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import TextField from '@Core/components/Inputs/TextField';
import TextArea from '@Core/components/Inputs/TextArea';
import Divider from '@Core/components/Dividers/Divider';
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormGroup from '@Core/components/Form/FormGroup';

export default {
    name: 'AttributeTranslationForm',
    components: {
        Card,
        Form,
        FormGroup,
        Divider,
        TextField,
        TextArea,
        AttributeOptionValues,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        ...mapState('dictionaries', {
            attrTypes: (state) => state.attrTypes,
        }),
        ...mapState('attribute', {
            type: (state) => state.type,
            isMultilingual: (state) => state.isMultilingual,
        }),
        hasPlaceholder() {
            return hasPlaceholder(this.type);
        },
        hasOptions() {
            return hasOptions(this.type);
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['ATTRIBUTE_UPDATE']);
        },
        errorLabelMessage() {
            const labelIndex = `label_${this.languageCode}`;
            return this.elementIsValidate(labelIndex);
        },
        errorPlaceholderMessage() {
            const placeholderIndex = `placeholder_${this.languageCode}`;
            return this.elementIsValidate(placeholderIndex);
        },
        errorHintMessage() {
            const hintIndex = `hint_${this.languageCode}`;
            return this.elementIsValidate(hintIndex);
        },
    },
};
</script>
