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
                        :data-cy="dataCyGenerator(nameFieldKey)"
                        :value="translations.name[languageCode]"
                        label="Tree name"
                        :disabled="!isAllowedToUpdate"
                        :error-messages="translationErrors[nameFieldKey]"
                        @input="(value) => setTranslationPropertyValue(value, nameFieldKey)" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import PRIVILEGES from '@Trees/config/privileges';

export default {
    name: 'CategoryTreeTranslationForm',
    components: {
        FormSection,
        Form,
        Card,
        TextField,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        dataCyGenerator(key) {
            return `category-tree-${key}_${this.languageCode}`;
        },
    },
};
</script>
