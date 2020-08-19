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
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import AttributeTranslationForm from '@Attributes/components/Forms/AttributeTranslationForm';
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';

export default {
    name: 'AttributeTranslationsTab',
    components: {
        TranslationsTab,
        AttributeTranslationForm,
    },
};
</script>
