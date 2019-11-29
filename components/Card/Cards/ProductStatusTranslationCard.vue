/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Modal :title="selectedLanguage">
        <Form>
            <FormGroup>
                <TextField
                    :value="translations.name[languageCode]"
                    solid
                    label="Status name"
                    regular
                    :error-messages="errorNameMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'name')" />
                <TextArea
                    :value="translations.description[languageCode]"
                    solid
                    label="Status description"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorDescriptionMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'description')" />
            </FormGroup>
        </Form>
    </Modal>
</template>

<script>
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import TextField from '~/core/components/Inputs/TextField';
import TextArea from '~/core/components/Inputs/TextArea';
import Modal from '~/core/components/Modal/Modal';
import Form from '~/core/components/Form/Form';
import FormGroup from '~/core/components/Form/FormGroup';

export default {
    name: 'ProductStatusTranslationCard',
    components: {
        FormGroup,
        Form,
        Modal,
        TextField,
        TextArea,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess(['WORKFLOW_UPDATE']);
        },
        errorDescriptionMessage() {
            const placeholderIndex = `description_${this.languageCode}`;
            return this.elementIsValidate(placeholderIndex);
        },
        errorNameMessage() {
            const hintIndex = `name_${this.languageCode}`;
            return this.elementIsValidate(hintIndex);
        },
    },
};
</script>
