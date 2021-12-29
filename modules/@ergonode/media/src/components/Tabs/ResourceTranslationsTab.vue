/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <ResourceTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateResourceTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateResourceTranslationButton from '@Media/components/Buttons/UpdateResourceTranslationButton';
import ResourceTranslationForm from '@Media/components/Forms/ResourceTranslationForm';

export default {
    name: 'ResourceTranslationsTab',
    components: {
        UpdateResourceTranslationButton,
        TranslationsTab,
        ResourceTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
