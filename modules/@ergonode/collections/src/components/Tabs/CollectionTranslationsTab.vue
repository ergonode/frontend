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
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateCollectionTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import UpdateCollectionTranslationButton from '@Collections/components/Buttons/UpdateCollectionTranslationButton';
import CollectionTranslationForm from '@Collections/components/Forms/CollectionTranslationForm';
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';

export default {
    name: 'AttributeGroupTranslationsTab',
    components: {
        TranslationsTab,
        CollectionTranslationForm,
        UpdateCollectionTranslationButton,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
