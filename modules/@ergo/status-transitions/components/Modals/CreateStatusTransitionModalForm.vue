/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create status transition"
        @close="onClose">
        <template #body>
            <TransitionForm />
        </template>
        <template #footer>
            <Button
                title="CREATE"
                :disabled="isRequestPending"
                @click.native="onCreated" />
            <Button
                title="CREATE & EDIT"
                :theme="secondaryTheme"
                :disabled="isRequestPending"
                @click.native="onCreatedAndEdit" />
        </template>
    </ModalForm>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { THEMES } from '@Core/defaults/buttons';

const createStatusTransitionModule = () => import('@Transitions/services/createStatusTransition.service');

export default {
    name: 'CreateStatusTransitionModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        TransitionForm: () => import('@Transitions/components/Forms/TransitionForm'),
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isRequestPending: false,
        };
    },
    computed: {
        ...mapState('transitions', {
            source: state => state.source,
            destination: state => state.destination,
        }),
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    created() {
        Promise.all([
            this.getProductStatuses({
                limit: 9999,
                offset: 0,
            }),
            this.getRoles({
                limit: 9999,
                offset: 0,
            }),
        ]);
    },
    methods: {
        ...mapActions('transitions', [
            'clearStorage',
        ]),
        ...mapActions('productStatus', [
            'getProductStatuses',
        ]),
        ...mapActions('roles', [
            'getRoles',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreated() {
            this.isRequestPending = true;
            this.removeValidationErrors();

            createStatusTransitionModule().then((response) => {
                response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then(() => {
                    this.isRequestPending = false;
                    this.removeValidationErrors();
                    this.$addAlert({ type: 'success', message: 'Status transition has been created' });
                    this.clearStorage();
                    this.$emit('created');
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                });
            });
        },
        onCreatedAndEdit() {
            this.isRequestPending = true;
            this.removeValidationErrors();

            createStatusTransitionModule().then((response) => {
                response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then(() => {
                    this.isRequestPending = false;
                    this.removeValidationErrors();
                    this.$addAlert({ type: 'success', message: 'Status transition has been created' });
                    this.$router.push({
                        name: 'transition-edit-id-general',
                        params: {
                            id: `${this.source.key}--${this.destination.key}`,
                        },
                    });
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                });
            });
        },
    },
};
</script>
