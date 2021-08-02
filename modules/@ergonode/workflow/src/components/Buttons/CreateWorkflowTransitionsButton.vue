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
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateWorkflowTransitionsButton',
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
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Workflow.workflow.components.CreateWorkflowTransitionsButton.errorMessage'),
            });

            this.isSubmitting = false;
        },
    },
};
</script>
