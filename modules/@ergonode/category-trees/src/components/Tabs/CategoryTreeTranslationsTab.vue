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
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';
import CategoryTreeTranslationForm from '@Trees/components/Forms/CategoryTreeTranslationForm';

export default {
    name: 'CategoryTreeTranslationsTab',
    components: {
        TranslationsTab,
        CategoryTreeTranslationForm,
    },
};
</script>
