/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Workflow.workflow.components.CreateWorkflowStatusModalForm.title')"
        @close="onClose">
        <template #body>
            <WorkflowStatusForm
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
import WorkflowStatusForm from '@Workflow/components/Forms/WorkflowStatusForm';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';
import state from '@Workflow/store/workflow/state';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateWorkflowStatusModalForm',
    components: {
        WorkflowStatusForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    fetch() {
        this.__setState({
            key: 'status',
            value: state().status,
        });
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    methods: {
        ...mapActions('workflow', [
            'createStatus',
            '__setState',
        ]),
        onClose() {
            this.__setState({
                key: 'status',
                value: state().status,
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
            this.createStatus({
                workflowId: this.$route.params.workflowId,
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
            this.createStatus({
                workflowId: this.$route.params.workflowId,
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.workflow.components.CreateWorkflowStatusModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.onClose();
            this.$router.push({
                name: ROUTE_NAME.WORKFLOW_STATUS_EDIT_GENERAL,
                params: {
                    id,
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
