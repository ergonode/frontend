/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <Modal data-cy="modal">
            <ModalHeader
                :title="title"
                @close="onClose">
                <template #prepend>
                    <slot name="prependHeader" />
                </template>
            </ModalHeader>
            <ModalBody>
                <slot name="body" />
            </ModalBody>
        </Modal>
    </ModalOverlay>
</template>

<script>
import Modal from '@UI/components/Modal/Modal';
import ModalBody from '@UI/components/Modal/ModalBody';
import ModalHeader from '@UI/components/Modal/ModalHeader';
import ModalOverlay from '@UI/components/Modal/ModalOverlay';

export default {
    name: 'ModalForm',
    components: {
        Modal,
        ModalBody,
        ModalHeader,
        ModalOverlay,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
