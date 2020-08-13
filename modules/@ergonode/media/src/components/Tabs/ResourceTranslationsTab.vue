/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <ResourceTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';
import ResourceTranslationForm from '@Media/components/Forms/ResourceTranslationForm';

export default {
    name: 'ResourceTranslationsTab',
    components: {
        TranslationsTab,
        ResourceTranslationForm,
    },
};
</script>
