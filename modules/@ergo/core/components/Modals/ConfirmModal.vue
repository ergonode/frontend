/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalConfirm
        :title="modalData.message"
        @close="onClose">
        <template #footer>
            <Button
                data-cy="modal-confirm"
                :title="agreeButtonText"
                @click.native="onAgree" />
            <Button
                data-cy="modal-cancel"
                title="CANCEL"
                :theme="secondaryTheme"
                @click.native="onClose" />
        </template>
    </ModalConfirm>
</template>

<script>
import { THEME } from '@Core/defaults/theme';

export default {
    name: 'ConfirmModal',
    components: {
        ModalConfirm: () => import('@Core/components/Modal/ModalConfirm'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    props: {
        type: {
            type: String,
            default: '',
        },
        agreeButton: {
            type: String,
            default: 'OK',
        },
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        agreeButtonText() {
            return this.agreeButton.toUpperCase();
        },
        modalData() {
            return this.$getModal(this.type);
        },
    },
    methods: {
        onClose() {
            this.$closeModal(this.type);
        },
        onAgree() {
            this.modalData.confirmCallback();
            this.onClose();
        },
    },
};
</script>
