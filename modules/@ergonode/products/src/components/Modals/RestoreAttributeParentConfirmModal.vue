/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <Modal data-cy="modal">
            <ConfirmModalHeader
                :title="$t('@Products.product.components.RestoreAttributeParentConfirmModal.confirmTitle')"
                @close="onClose" />
            <ModalFooter>
                <Button
                    :title="$t('@Products.product.components.RestoreAttributeParentConfirmModal.buttonTitle')"
                    :size="smallSize"
                    @click.native="onRestore">
                    <template
                        v-if="isSubmitting"
                        #prepend="{ color }">
                        <IconSpinner :fill-color="color" />
                    </template>
                </Button>
                <Button
                    :title="$t('@Products._.cancel')"
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
import ConfirmModalHeader from '@UI/components/ConfirmModal/ConfirmModalHeader';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RestoreAttributeParentConfirmModal',
    components: {
        ConfirmModalHeader,
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
            'removeProductValues',
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

            this.removeProductValues({
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
                message: this.$t('@Products.product.components.RestoreAttributeParentConfirmModal.successMessage'),
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
                message: this.$t('@Products.product.components.RestoreAttributeParentConfirmModal.errorMessage'),
            });

            this.isSubmitting = false;
        },
    },
};
</script>
