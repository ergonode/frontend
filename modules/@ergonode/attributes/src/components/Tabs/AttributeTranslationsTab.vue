/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <AttributeTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateAttributeTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import UpdateAttributeTranslationButton from '@Attributes/components/Buttons/UpdateAttributeTranslationButton';
import AttributeTranslationForm from '@Attributes/components/Forms/AttributeTranslationForm';
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';

export default {
    name: 'AttributeTranslationsTab',
    components: {
        UpdateAttributeTranslationButton,
        TranslationsTab,
        AttributeTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
