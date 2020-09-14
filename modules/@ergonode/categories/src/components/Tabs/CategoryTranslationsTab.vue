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
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import CategoryTranslationForm from '@Categories/components/Forms/CategoryTranslationForm';
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';

export default {
    name: 'CategoryTranslationsTab',
    components: {
        TranslationsTab,
        CategoryTranslationForm,
    },
};
</script>
