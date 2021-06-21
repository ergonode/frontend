/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <WorkflowStatusTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <UpdateWorkflowTranslationButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateWorkflowTranslationButton from '@Workflow/components/Buttons/UpdateWorkflowTranslationButton';
import WorkflowStatusTranslationForm from '@Workflow/components/Forms/WorkflowStatusTranslationForm';

export default {
    name: 'WorkflowStatusTranslationsTab',
    components: {
        UpdateWorkflowTranslationButton,
        TranslationsTab,
        WorkflowStatusTranslationForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
