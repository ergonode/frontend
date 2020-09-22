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
                        label="Status name"
                        :error-messages="translationErrors[nameKeyField]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'name')" />
                    <TextArea
                        :data-cy="dataCyGenerator(descriptionKeyField)"
                        :value="translations.description[languageCode]"
                        label="Status description"
                        resize="none"
                        height="150px"
                        :error-messages="translationErrors[descriptionKeyField]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'description')" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextArea from '@Core/components/Inputs/TextArea';
import TextField from '@Core/components/Inputs/TextField';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import PRIVILEGES from '@Transitions/config/privileges';

export default {
    name: 'ProductStatusTranslationForm',
    components: {
        FormSection,
        Form,
        Card,
        TextField,
        TextArea,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
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
            return `status-${key}_${this.languageCode}`;
        },
    },
};
</script>
