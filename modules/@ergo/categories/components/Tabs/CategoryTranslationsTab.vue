/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <CategoryTranslationForm
                v-for="(languageCode, index) in languageCodes"
                :key="index"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
export default {
    name: 'CategoryTranslationsTab',
    components: {
        TranslationsTab: () => import('@Core/components/Card/Tabs/TranslationsTab'),
        CategoryTranslationForm: () => import('@Categories/components/Forms/CategoryTranslationForm'),
    },
};
</script>
