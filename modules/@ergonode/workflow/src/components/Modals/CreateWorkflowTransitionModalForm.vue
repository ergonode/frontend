/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Workflow.workflow.components.CreateWorkflowTransitionModalForm.title')"
        @close="onClose">
        <template #body>
            <WorkflowTransitionForm
                :submit-title="$t('@Workflow._.create')"
                :proceed-title="$t('@Workflow._.proceed')"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import ModalForm from '@UI/components/Modal/ModalForm';
import WorkflowTransitionForm from '@Workflow/components/Forms/WorkflowTransitionForm';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';
import state from '@Workflow/store/workflow/state';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CreateWorkflowTransitionModalForm',
    components: {
        ModalForm,
        WorkflowTransitionForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        ...mapState('workflow', [
            'transition',
        ]),
    },
    created() {
        this.getStatuses();
    },
    methods: {
        ...mapActions('workflow', [
            'createTransition',
            'getStatuses',
        ]),
        onClose() {
            const {
                transition,
                statuses,
            } = state();

            this.__setState({
                key: 'transition',
                value: transition,
            });
            this.__setState({
                key: 'statuses',
                value: statuses,
            });
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.createTransition({
                scope: this.scope,
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeScopeErrors(this.scope);
            this.createTransition({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.workflow.components.CreateWorkflowTransitionModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess() {
            this.isProceeding = false;

            this.onClose();
            this.$router.push({
                name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT_GENERAL,
                params: {
                    id: `${this.transition.source.key}--${this.transition.destination.key}`,
                },
            });
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
            this.isProceeding = false;
        },
    },
};
</script>
