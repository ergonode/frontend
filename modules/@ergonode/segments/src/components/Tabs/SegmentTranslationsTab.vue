/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <SegmentTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :language-code="languageCode" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';
import SegmentTranslationForm from '@Segments/components/Forms/SegmentTranslationForm';

export default {
    name: 'SegmentTranslationsTab',
    components: {
        TranslationsTab,
        SegmentTranslationForm,
    },
};
</script>
