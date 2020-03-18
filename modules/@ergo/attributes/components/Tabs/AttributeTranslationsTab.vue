/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <AttributeTranslationForm
                v-for="(languageCode, index) in languageCodes"
                :key="index"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
export default {
    name: 'AttributeTranslationsTab',
    components: {
        TranslationsTab: () => import('@Core/components/Card/Tabs/TranslationsTab'),
        AttributeTranslationForm: () => import('@Attributes/components/Forms/AttributeTranslationForm'),
    },
};
</script>
