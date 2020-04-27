/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :fields-keys="[nameKeyField]">
            <template #body="{ errorMessages }">
                <FormSection>
                    <TextField
                        :value="translations.name[languageCode]"
                        solid
                        regular
                        label="Group name"
                        :disabled="!isUserAllowedToUpdate"
                        :error-messages="errorMessages[nameKeyField]"
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
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/FormSection';

export default {
    name: 'AttributeGroupTranslationForm',
    components: {
        FormSection,
        Form,
        Card,
        TextField,
    },
    mixins: [translationCardMixin],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess(['ATTRIBUTE_UPDATE']);
        },
        nameKeyField() {
            return `name_${this.languageCode}`;
        },
    },
};
</script>
