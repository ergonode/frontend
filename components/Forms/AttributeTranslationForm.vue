/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Modal :title="selectedLanguage">
        <Form>
            <FormGroup>
                <TextField
                    :value="translations.label[languageCode]"
                    solid
                    label="Attribute name"
                    regular
                    :error-messages="errorLabelMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'label')" />
                <TextArea
                    v-if="hasPlaceholder"
                    :value="translations.placeholder[languageCode]"
                    solid
                    label="Placeholder"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorPlaceholderMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'placeholder')" />
                <TextArea
                    :value="translations.hint[languageCode]"
                    solid
                    label="Tooltip for writers"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorHintMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'hint')" />
                <template v-if="hasOptions">
                    <Divider />
                    <AttributeOptionValues
                        :language-code="languageCode"
                        :disabled="!isUserAllowedToUpdate" />
                </template>
            </FormGroup>
        </Form>
    </Modal>
</template>

<script>
import { mapState } from 'vuex';
import { hasPlaceholder, hasOptions } from '~/model/attributes/AttributeTypes';
import { getParsedType } from '~/model/mappers/attributeMapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import TextField from '~/core/components/Inputs/TextField';
import TextArea from '~/core/components/Inputs/TextArea';
import Divider from '~/components/Dividers/Divider';
import AttributeOptionValues from '~/components/Card/AttributeOptionValues';
import Modal from '~/core/components/Modal/Modal';
import Form from '~/core/components/Form/Form';
import FormGroup from '~/core/components/Form/FormGroup';

export default {
    name: 'AttributeTranslationForm',
    components: {
        Modal,
        Form,
        FormGroup,
        Divider,
        TextField,
        TextArea,
        AttributeOptionValues,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        ...mapState('data', {
            attrTypes: (state) => state.attrTypes,
        }),
        ...mapState('attribute', {
            type: (state) => state.type,
        }),
        hasPlaceholder() {
            return hasPlaceholder(
                getParsedType(
                    this.attrTypes,
                    this.type,
                ),
            );
        },
        hasOptions() {
            return hasOptions(
                getParsedType(
                    this.attrTypes,
                    this.type,
                ),
            );
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
