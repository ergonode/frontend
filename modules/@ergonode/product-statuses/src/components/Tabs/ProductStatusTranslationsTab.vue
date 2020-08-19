/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <ProductStatusTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';
import ProductStatusTranslationForm from '@Statuses/components/Form/ProductStatusTranslationForm';

export default {
    name: 'ProductStatusTranslationsTab',
    components: {
        TranslationsTab,
        ProductStatusTranslationForm,
    },
};
</script>
