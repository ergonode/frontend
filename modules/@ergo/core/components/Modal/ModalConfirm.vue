/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <Modal data-cy="modal">
            <ModalHeader
                :size="smallSize"
                :title="title"
                @close="onClose" />
            <ModalFooter>
                <slot name="footer" />
            </ModalFooter>
        </Modal>
    </ModalOverlay>
</template>

<script>
import Modal from '@Core/components/Modal/Modal';
import ModalFooter from '@Core/components/Modal/ModalFooter';
import ModalHeader from '@Core/components/Modal/ModalHeader';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ModalConfirm',
    components: {
        ModalOverlay,
        ModalHeader,
        Modal,
        ModalFooter,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
