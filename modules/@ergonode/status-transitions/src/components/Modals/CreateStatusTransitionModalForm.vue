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
                proceed-title="CREATE AND EDIT"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
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
        ...mapState('statusTransition', {
            source: state => state.source,
            destination: state => state.destination,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
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
            'createTransition',
        ]),
        ...mapActions('productStatus', [
            'getProductStatuses',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.createTransition({
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeErrors();
            this.createTransition({
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
        onCreatedAndEdit() {
            this.onActionRequest(() => {
                this.$router.push({
                    name: 'transition-id-general',
                    params: {
                        id: `${this.source.key}--${this.destination.key}`,
                    },
                });
            });
        },
    },
};
</script>
