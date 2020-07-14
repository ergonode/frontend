/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :fields-keys="[descriptionKeyField, nameKeyField]">
            <template #body="{ errorMessages }">
                <FormSection>
                    <TextField
                        :data-cy="dataCyGenerator(nameKeyField)"
                        :value="translations.name[languageCode]"
                        label="Product collection name"
                        :disabled="!isUserAllowedToUpdate"
                        :error-messages="errorMessages[nameKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, 'name')" />
                    <TextArea
                        :data-cy="dataCyGenerator(descriptionKeyField)"
                        :value="translations.description[languageCode]"
                        label="Description"
                        resize="vertical"
                        :style="{height: '150px'}"
                        :error-messages="errorMessages[descriptionKeyField]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'description')" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextArea from '@Core/components/Inputs/TextArea';
import TextField from '@Core/components/Inputs/TextField';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'CollectionTranslationForm',
    components: {
        FormSection,
        Form,
        Card,
        TextArea,
        TextField,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        descriptionKeyField() {
            return `description_${this.languageCode}`;
        },
        nameKeyField() {
            return `name_${this.languageCode}`;
        },
    },
    methods: {
        dataCyGenerator(key) {
            return `collection-${key}`;
        },
    },
};
</script>
