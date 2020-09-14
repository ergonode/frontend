/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <AttributeGroupTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import AttributeGroupTranslationForm from '@Attributes/components/Forms/AttributeGroupTranslationForm';
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';

export default {
    name: 'AttributeGroupTranslationsTab',
    components: {
        TranslationsTab,
        AttributeGroupTranslationForm,
    },
};
</script>
