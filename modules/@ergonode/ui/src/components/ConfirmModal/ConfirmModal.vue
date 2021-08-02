/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <Modal data-cy="modal">
            <ConfirmModalHeader
                :title="title"
                :subtitle="subtitle"
                @close="onClose" />
            <ModalFooter>
                <Button
                    data-cy="modal-confirm"
                    :theme="applyActionTheme"
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
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ConfirmModalHeader from '@UI/components/ConfirmModal/ConfirmModalHeader';

export default {
    name: 'ConfirmModal',
    components: {
        ConfirmModalHeader,
    },
    props: {
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'Confirm',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: '',
        },
        /**
         * The title of apply button
         */
        applyTitle: {
            type: String,
            default: 'OK',
        },
        /**
         * The title of cancel button
         */
        cancelTitle: {
            type: String,
            default: 'CANCEL',
        },
        /**
         * The method executed in apply click event
         */
        action: {
            type: Function,
            default: () => {},
        },
        /**
         * The type of modal
         */
        type: {
            type: String,
            default: MODAL_TYPE.POSITIVE,
            validator: value => Object.values(MODAL_TYPE).indexOf(value) !== -1,
        },
    },
    computed: {
        applyActionTheme() {
            return this.type === MODAL_TYPE.POSITIVE
                ? THEME.PRIMARY
                : THEME.DESTRUCTIVE;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onClose() {
            this.$emit('close', this.index);
        },
        async onAgree() {
            await this.action();

            this.onClose();
        },
    },
};
</script>
