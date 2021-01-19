/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <CategoryTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateCategoryTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import UpdateCategoryTranslationButton from '@Categories/components/Buttons/UpdateCategoryTranslationButton';
import CategoryTranslationForm from '@Categories/components/Forms/CategoryTranslationForm';
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';

export default {
    name: 'CategoryTranslationsTab',
    components: {
        UpdateCategoryTranslationButton,
        TranslationsTab,
        CategoryTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
