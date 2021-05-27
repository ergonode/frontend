/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template #default="{ hasValueToSave }">
            <Button
                data-cy="submit"
                :title="$t('@Workflow._.submit')"
                :floating="{ bottom: '24px', right: '24px' }"
                :disabled="!isAllowedToUpdate"
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
import Button from '@UI/components/Button/Button';
import FeedbackProvider from '@UI/components/Feedback/FeedbackProvider';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import IconSync from '@UI/components/Icons/Feedback/IconSync';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateWorkflowTransitionsButton',
    components: {
        FeedbackProvider,
        Button,
        IconSpinner,
        IconSync,
    },
    mixins: [
        updateButtonFeedbackMixin,
    ],
    props: {
        transitions: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
    },
    methods: {
        ...mapActions('workflow', [
            'updateTransitions',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.updateTransitions({
                scope: this.scope,
                transitions: this.transitions,
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });

            this.removeScopeErrors(this.scope);
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.workflow.components.CreateWorkflowTransitionsButton.successMessage'),
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
