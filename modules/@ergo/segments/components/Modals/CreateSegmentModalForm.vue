/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create segment"
        @close="onClose">
        <template #body>
            <SegmentForm />
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
import { mapActions } from 'vuex';
import { THEME } from '@Core/defaults/theme';
import { MODAL_ACTION } from '@Core/defaults/modals';
import actionModalFormMixin from '@Core/mixins/modals/actionModalFormMixin';

const createSegment = () => import('@Segments/services/createSegment.service');

export default {
    name: 'CreateSegmentModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        SegmentForm: () => import('@Segments/components/Forms/SegmentForm'),
    },
    mixins: [actionModalFormMixin({ action: MODAL_ACTION.CREATE, namespace: 'Segment', request: createSegment })],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('segments', [
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onActionRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onActionRequest((id) => {
                this.$router.push({
                    name: 'segment-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
