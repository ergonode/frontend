/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <AttributeGroupTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateAttributeGroupTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import UpdateAttributeGroupTranslationButton
    from '@Attributes/components/Buttons/UpdateAttributeGroupTranslationButton';
import AttributeGroupTranslationForm from '@Attributes/components/Forms/AttributeGroupTranslationForm';
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';

export default {
    name: 'AttributeGroupTranslationsTab',
    components: {
        UpdateAttributeGroupTranslationButton,
        TranslationsTab,
        AttributeGroupTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
