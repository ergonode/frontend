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
                :title="$t('@Workflow._.submit')"
                :floating="saveChangesButtonFloatingStyle"
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
import {
    Z_INDEX_LVL_2,
} from '@UI/assets/scss/_js-variables/indexes.scss';
import Button from '@UI/components/Button/Button';
import FeedbackProvider from '@UI/components/Feedback/FeedbackProvider';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import IconSync from '@UI/components/Icons/Feedback/IconSync';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UpdateWorkflowTransitionConditionDesignerButton',
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
        ...mapState('workflow', [
            'transition',
        ]),
        saveChangesButtonFloatingStyle() {
            return {
                bottom: '24px',
                right: '24px',
                zIndex: Z_INDEX_LVL_2,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
    },
    methods: {
        ...mapActions('workflow', [
            '__setState',
            'updateTransition',
        ]),
        ...mapActions('condition', [
            'createConditionSet',
            'updateConditionSet',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);

            if (!this.transition.conditionSetId) {
                this.createConditionSet({
                    scope: this.scope,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            } else {
                this.updateConditionSet({
                    scope: this.scope,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            }
        },
        async onUpdateSuccess(id) {
            this.__setState({
                key: 'transition',
                value: {
                    ...this.transition,
                    conditionSetId: id,
                },
            });

            await this.updateTransition({
                scope: this.scope,
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.workflow.components.CreateWorkflowTransitionsButton.successMessage'),
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
