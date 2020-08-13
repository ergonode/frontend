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
import {
    MODAL_ACTION,
} from '@Core/defaults/modals';
import {
    THEME,
} from '@Core/defaults/theme';
import actionModalFormMixin from '@Core/mixins/modals/actionModalFormMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

const createStatusTransition = () => import('@Transitions/services/createStatusTransition.service');

export default {
    name: 'CreateStatusTransitionModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Button/Button'),
        TransitionForm: () => import('@Transitions/components/Forms/TransitionForm'),
    },
    mixins: [
        actionModalFormMixin({
            action: MODAL_ACTION.CREATE,
            namespace: 'Status transition',
            request: createStatusTransition,
        }),
    ],
    computed: {
        ...mapState('transitions', {
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
        ...mapActions('transitions', [
            '__clearStorage',
        ]),
        ...mapActions('productStatus', [
            'getProductStatuses',
        ]),
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onActionRequest(() => {
                this.__clearStorage();
            });
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
