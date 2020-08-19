/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :fields-keys="[altKeyField]">
            <template #body="{ errorMessages }">
                <FormSection>
                    <TextArea
                        :data-cy="dataCyGenerator(altKeyField)"
                        :value="translations.alt[languageCode]"
                        label="Alternate text"
                        resize="none"
                        height="150px"
                        :disabled="!isUserAllowedToUpdate"
                        :error-messages="errorMessages[altKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, 'alt')" />
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
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import PRIVILEGES from '@Media/config/privileges';

export default {
    name: 'ResourceTranslationForm',
    components: {
        FormSection,
        Form,
        Card,
        TextArea,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]);
        },
        altKeyField() {
            return `alt_${this.languageCode}`;
        },
    },
    methods: {
        dataCyGenerator(key) {
            return `media-${key}`;
        },
    },
};
</script>
