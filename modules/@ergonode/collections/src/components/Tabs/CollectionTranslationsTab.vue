/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <CollectionTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import CollectionTranslationForm from '@Collections/components/Forms/CollectionTranslationForm';
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';

export default {
    name: 'AttributeGroupTranslationsTab',
    components: {
        TranslationsTab,
        CollectionTranslationForm,
    },
};
</script>
