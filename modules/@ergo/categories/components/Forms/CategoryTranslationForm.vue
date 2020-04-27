/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :fields-keys="[nameFieldKey]">
            <template #body="{ errorMessages }">
                <FormSection>
                    <TextField
                        :value="translations.name[languageCode]"
                        solid
                        regular
                        label="Category name"
                        :disabled="!isUserAllowedToUpdate"
                        :error-messages="errorMessages[nameFieldKey]"
                        @input="(value) => setTranslationPropertyValue(value, 'name')" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import TextField from '@Core/components/Inputs/TextField';
import Card from '@Core/components/Card/Card';
import FormSection from '@Core/components/Form/FormSection';
import Form from '@Core/components/Form/Form';

export default {
    name: 'CategoryTranslationForm',
    components: {
        Form,
        FormSection,
        Card,
        TextField,
    },
    mixins: [translationCardMixin],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess(['CATEGORY_UPDATE']);
        },
        nameFieldKey() {
            return `name_${this.languageCode}`;
        },
    },
};
</script>
