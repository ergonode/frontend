/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <ProductStatusTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateProductStatusTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateProductStatusTranslationButton from '@Statuses/components/Buttons/UpdateProductStatusTranslationButton';
import ProductStatusTranslationForm from '@Statuses/components/Forms/ProductStatusTranslationForm';

export default {
    name: 'ProductStatusTranslationsTab',
    components: {
        UpdateProductStatusTranslationButton,
        TranslationsTab,
        ProductStatusTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
