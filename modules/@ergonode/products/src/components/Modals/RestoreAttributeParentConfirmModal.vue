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
                    :size="smallSize"
                    @click.native="onRestore">
                    <template
                        v-if="isSubmitting"
                        #prepend="{ color }">
                        <IconSpinner :fill-color="color" />
                    </template>
                </Button>
                <Button
                    title="CANCEL"
                    :theme="secondaryTheme"
                    :disabled="isSubmitting"
                    :size="smallSize"
                    @click.native="onClose" />
            </ModalFooter>
        </Modal>
    </ModalOverlay>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import ConfirmModalHeader from '@UI/components/ConfirmModal/ConfirmModalHeader';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import Modal from '@UI/components/Modal/Modal';
import ModalFooter from '@UI/components/Modal/ModalFooter';
import ModalOverlay from '@UI/components/Modal/ModalOverlay';
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
        IconSpinner,
    },
    props: {
        element: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSubmitting: false,
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
            if (this.isSubmitting) {
                return;
            }

            this.isSubmitting = true;

            const {
                languageCode,
                attribute,
            } = this.element;

            this.removeProductDraft({
                languageCode,
                attributeId: attribute.element_id,
                onSuccess: this.onRestoreProductDraftSuccess,
                onError: this.onRestoreProductDraftError,
            });
        },
        onRestoreProductDraftSuccess() {
            const {
                languageCode,
                productId,
                attribute,
            } = this.element;

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

            this.isSubmitting = false;
        },
        onRestoreProductDraftError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Restore error',
            });

            this.isSubmitting = false;
        },
    },
};
</script>
