/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <Modal data-cy="modal">
            <ConfirmModalHeader
                title="Do you want to restore parent translation value of selected cell?"
                @close="onClose" />
            <ModalFooter>
                <Button
                    title="YES, RESTORE"
                    :disabled="isRequestPending"
                    :size="smallSize"
                    @click.native="onRestore" />
                <Button
                    title="CANCEL"
                    :theme="secondaryTheme"
                    :disabled="isRequestPending"
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
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RestoreAttributeParentConfirmModal',
    components: {
        ModalOverlay,
        ConfirmModalHeader,
        Modal,
        ModalFooter,
        Button,
    },
    props: {
        element: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isRequestPending: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('product', [
            'removeProductDraft',
        ]),
        onClose() {
            this.$emit('close');
        },
        onRestore() {
            const {
                languageCode, productId, attribute,
            } = this.element;

            this.removeProductDraft({
                languageCode,
                attributeId: attribute.element_id,
            }).then(() => {
                this.isRequestPending = false;
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: 'Value restored',
                });
                this.$emit('restore', {
                    languageCode,
                    productId,
                    attribute,
                });
                this.$emit('close');
            }).catch(() => {
                this.isRequestPending = false;
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Restore error',
                });
            });
        },
    },
};
</script>
