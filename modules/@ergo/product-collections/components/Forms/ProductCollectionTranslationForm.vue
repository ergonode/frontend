/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form>
            <FormGroup>
                <TextField
                    :value="translations.name[languageCode]"
                    solid
                    regular
                    label="Product collection name"
                    :disabled="!isUserAllowedToUpdate"
                    :error-messages="errorNameMessage"
                    @input="(value) => setTranslationPropertyValue(value, 'name')" />
                <TextArea
                    :value="translations.description[languageCode]"
                    solid
                    label="Description"
                    resize="vertical"
                    :style="{height: '150px'}"
                    :error-messages="errorDescriptionMessage"
                    :disabled="!isUserAllowedToUpdate"
                    @input="(value) => setTranslationPropertyValue(value, 'description')" />
            </FormGroup>
        </Form>
    </Card>
</template>

<script>
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import TextField from '@Core/components/Inputs/TextField';
import TextArea from '@Core/components/Inputs/TextArea';
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormGroup from '@Core/components/Form/FormGroup';

export default {
    name: 'ProductCollectionTranslationForm',
    components: {
        FormGroup,
        Form,
        Card,
        TextArea,
        TextField,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_COLLECTION_UPDATE']);
        },
        errorDescriptionMessage() {
            const placeholderIndex = `description_${this.languageCode}`;
            return this.elementIsValidate(placeholderIndex);
        },
        errorNameMessage() {
            const nameIndex = `name_${this.languageCode}`;
            return this.elementIsValidate(nameIndex);
        },
    },
};
</script>
