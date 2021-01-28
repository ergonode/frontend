/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <CategoryTreeTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateCategoryTreeTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateCategoryTreeTranslationButton from '@Trees/components/Buttons/UpdateCategoryTreeTranslationButton';
import CategoryTreeTranslationForm from '@Trees/components/Forms/CategoryTreeTranslationForm';

export default {
    name: 'CategoryTreeTranslationsTab',
    components: {
        UpdateCategoryTreeTranslationButton,
        TranslationsTab,
        CategoryTreeTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
