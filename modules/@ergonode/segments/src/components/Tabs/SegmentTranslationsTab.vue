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
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <Button
                data-cy="submit"
                title="SAVE CHANGES"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSubmit">
                <template
                    v-if="isSubmitting"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </TranslationsTab>
</template>

<script>
import TranslationsTab from '@Core/components/Tabs/TranslationsTab';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import SegmentTranslationForm from '@Segments/components/Forms/SegmentTranslationForm';
import Button from '@UI/components/Button/Button';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'SegmentTranslationsTab',
    components: {
        TranslationsTab,
        SegmentTranslationForm,
        Button,
        IconSpinner,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('segment', [
            'updateSegment',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateSegment({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment translations have been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
