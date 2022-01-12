/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <SegmentTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateSegmentTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateSegmentTranslationButton from '@Segments/components/Buttons/UpdateSegmentTranslationButton';
import SegmentTranslationForm from '@Segments/components/Forms/SegmentTranslationForm';

export default {
    name: 'SegmentTranslationsTab',
    components: {
        UpdateSegmentTranslationButton,
        TranslationsTab,
        SegmentTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
