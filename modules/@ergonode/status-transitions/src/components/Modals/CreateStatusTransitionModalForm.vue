/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create status transition"
        @close="onClose">
        <template #body>
            <TransitionForm
                submit-title="CREATE"
                proceed-title="CREATE & EDIT"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :errors="scopeErrors"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    toLowerCaseFirstLetter,
} from '@Core/models/stringWrapper';
import TransitionForm from '@Transitions/components/Forms/TransitionForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CreateStatusTransitionModalForm',
    components: {
        ModalForm,
        TransitionForm,
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        ...mapState('validations', [
            'errors',
        ]),
        ...mapState('statusTransition', [
            'source',
            'destination',
        ]),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        scope() {
            return toLowerCaseFirstLetter(this.$options.name);
        },
        scopeErrors() {
            return this.errors[this.scope];
        },
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
        ...mapActions('validations', [
            'onError',
            'removeScopeErrors',
        ]),
        onClose() {
            this.__clearStorage();
            this.removeScopeErrors(this.scope);

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
                message: 'Transition created',
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess() {
            this.isProceeding = false;

            this.$router.push({
                name: 'transition-id-general',
                params: {
                    id: `${this.source.key}--${this.destination.key}`,
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
