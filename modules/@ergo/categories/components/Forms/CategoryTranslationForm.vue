/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :fields-keys="[nameKeyField]">
            <template #body="{ errorMessages }">
                <FormGroup>
                    <TextField
                        :value="translations.name[languageCode]"
                        solid
                        regular
                        label="Category name"
                        :disabled="!isUserAllowedToUpdate"
                        :error-messages="errorMessages[nameFieldKey]"
                        @input="(value) => setTranslationPropertyValue(value, 'name')" />
                </FormGroup>
            </template>
        </Form>
    </Card>
</template>

<script>
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import TextField from '@Core/components/Inputs/TextField';
import Card from '@Core/components/Card/Card';
import FormGroup from '@Core/components/Form/FormGroup';
import Form from '@Core/components/Form/Form';

export default {
    name: 'CategoryTranslationForm',
    components: {
        Form,
        FormGroup,
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
