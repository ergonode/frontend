/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Transitions.transition.components.CreateStatusTransitionModalForm.title')"
        @close="onClose">
        <template #body>
            <TransitionForm
                :submit-title="$t('@Transitions._.create')"
                :proceed-title="$t('@Transitions._.proceed')"
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
import TransitionForm from '@Transitions/components/Forms/TransitionForm';
import {
    ROUTE_NAME,
} from '@Transitions/config/routes';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CreateStatusTransitionModalForm',
    components: {
        TransitionForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    fetch() {
        this.__clearStorage();
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        ...mapState('statusTransition', [
            'from',
            'to',
        ]),
    },
    created() {
        this.getProductStatuses({
            limit: 9999,
            offset: 0,
        });
    },
    methods: {
        ...mapActions('statusTransition', [
            '__clearStorage',
            'createStatusTransition',
        ]),
        ...mapActions('productStatus', [
            'getProductStatuses',
        ]),
        onClose() {
            this.__clearStorage();
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.createStatusTransition({
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
            this.createStatusTransition({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Transitions.transition.components.CreateStatusTransitionModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess() {
            this.isProceeding = false;

            this.onClose();
            this.$router.push({
                name: ROUTE_NAME.STATUS_TRANSITION_EDIT_GENERAL,
                params: {
                    id: `${this.from.key}--${this.to.key}`,
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
