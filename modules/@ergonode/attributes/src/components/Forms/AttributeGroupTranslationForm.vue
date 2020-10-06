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
                        label="Group name"
                        :disabled="!isAllowedToUpdate"
                        :error-messages="translationErrors[nameKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, nameKeyField)" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'AttributeGroupTranslationForm',
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
                PRIVILEGES.ATTRIBUTE_GROUP.update,
            ]);
        },
        nameKeyField() {
            return 'name';
        },
    },
    methods: {
        dataCyGenerator(key) {
            return `attribute-group-${key}_${this.languageCode}`;
        },
    },
};
</script>
