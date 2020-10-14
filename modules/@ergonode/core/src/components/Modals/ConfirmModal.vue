/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <Modal data-cy="modal">
            <ConfirmModalHeader
                :title="modalData.message"
                @close="onClose" />
            <ModalFooter>
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
            </ModalFooter>
        </Modal>
    </ModalOverlay>
</template>

<script>
import Button from '@Core/components/Button/Button';
import Modal from '@Core/components/Modal/Modal';
import ModalFooter from '@Core/components/Modal/ModalFooter';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import ConfirmModalHeader from '@Core/components/Modals/ConfirmModalHeader';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ConfirmModal',
    components: {
        ModalOverlay,
        ConfirmModalHeader,
        Modal,
        ModalFooter,
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
