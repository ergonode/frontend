/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :errors="translationErrors">
            <template #body>
                <FormSection>
                    <TextField
                        :data-cy="dataCyGenerator(nameKeyField)"
                        :value="translations.name[languageCode]"
                        label="Product collection name"
                        :disabled="!isAllowedToUpdate"
                        :error-messages="translationErrors[nameKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, nameKeyField)" />
                    <TextArea
                        :data-cy="dataCyGenerator(descriptionKeyField)"
                        :value="translations.description[languageCode]"
                        label="Description"
                        resize="vertical"
                        height="150px"
                        :error-messages="translationErrors[descriptionKeyField]"
                        :disabled="!isAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(
                            value,
                            descriptionKeyField,
                        )" />
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
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        descriptionKeyField() {
            return 'description';
        },
        nameKeyField() {
            return 'name';
        },
    },
    methods: {
        dataCyGenerator(key) {
            return `collection-${key}_${this.languageCode}`;
        },
    },
};
</script>
