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
                :title="applyTitle"
                :size="smallSize"
                @click.native="onAgree" />
            <Button
                data-cy="modal-cancel"
                :title="cancelTitle"
                :theme="secondaryTheme"
                :size="smallSize"
                @click.native="onClose" />
        </template>
    </ModalConfirm>
</template>

<script>
import Button from '@Core/components/Button/Button';
import ModalConfirm from '@Core/components/Modal/ModalConfirm';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ConfirmModal',
    components: {
        ModalConfirm,
        Button,
    },
    props: {
        type: {
            type: String,
            default: '',
        },
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        modalData() {
            return this.$getModal(this.type);
        },
        applyTitle() {
            return this.modalData.applyTitle || 'OK';
        },
        cancelTitle() {
            return this.modalData.cancelTitle || 'CANCEL';
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
