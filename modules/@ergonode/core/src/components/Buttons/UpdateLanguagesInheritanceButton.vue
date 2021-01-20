/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template #default="{ hasValueToSave }">
            <Button
                data-cy="submit"
                :title="$t('core.buttons.submit')"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSubmit">
                <template #prepend="{ color }">
                    <IconSpinner
                        v-if="isSubmitting"
                        :fill-color="color" />
                    <IconSync
                        v-else-if="hasValueToSave"
                        :fill-color="color" />
                </template>
            </Button>
        </template>
    </FeedbackProvider>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import {
    getMappedTreeData,
} from '@Core/models/mappers/languageTreeMapper';
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import Button from '@UI/components/Button/Button';
import FeedbackProvider from '@UI/components/Feedback/FeedbackProvider';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import IconSync from '@UI/components/Icons/Feedback/IconSync';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UpdateLanguagesInheritanceButton',
    components: {
        FeedbackProvider,
        Button,
        IconSpinner,
        IconSync,
    },
    mixins: [
        updateButtonFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('gridDesigner', [
            'fullGridData',
        ]),
    },
    methods: {
        ...mapActions('core', [
            'setLanguageTree',
            'setDefaultLanguage',
            'updateLanguageTree',
        ]),
        ...mapActions('authentication', [
            'getUser',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            if (!isEmpty(this.fullGridData)) {
                this.isSubmitting = true;

                const [
                    languages,
                ] = getMappedTreeData(this.fullGridData);

                this.removeScopeErrors(this.scope);

                this.updateLanguageTree({
                    languages,
                    onSuccess: () => this.onUpdateSuccess(languages),
                    onError: this.onUpdateError,
                });
            }
        },
        async onUpdateSuccess(languages) {
            this.setLanguageTree(languages);

            await this.getUser({
                onSuccess: this.onGetUserSuccess,
            });
        },
        onUpdateError(message) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message,
            });
            this.isSubmitting = false;
        },
        onGetUserSuccess() {
            this.setDefaultLanguage();

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Languages tree has been updated',
            });
            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
    },
};
</script>
