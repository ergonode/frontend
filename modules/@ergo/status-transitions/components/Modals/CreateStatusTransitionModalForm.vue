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
                @click.native="onCreate" />
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
import createModalFormMixin from '@Core/mixins/modals/createModalFormMixin';

const createStatusTransition = () => import('@Transitions/services/createStatusTransition.service');

export default {
    name: 'CreateStatusTransitionModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        TransitionForm: () => import('@Transitions/components/Forms/TransitionForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Status transition', createRequest: createStatusTransition })],
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
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onCreateRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onCreateRequest(() => {
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
