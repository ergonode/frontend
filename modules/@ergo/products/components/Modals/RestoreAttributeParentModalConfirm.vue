/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalConfirm
        title="Do you want to restore parent translation value of selected cell? "
        @close="onClose">
        <template #footer>
            <Button
                title="YES, RESTORE"
                :disabled="isRequestPending"
                @click.native="onRestore" />
            <Button
                title="CANCEL"
                :theme="secondaryTheme"
                :disabled="isRequestPending"
                @click.native="onClose" />
        </template>
    </ModalConfirm>
</template>

<script>
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { THEME } from '@Core/defaults/theme';

const deleteAttributeValues = () => import('@Products/services/deleteAttributeValues.service');

export default {
    name: 'RestoreAttributeParentModalConfirm',
    components: {
        ModalConfirm: () => import('@Core/components/Modal/ModalConfirm'),
        Button: () => import('@Core/components/Buttons/Button'),
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
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
        onRestore() {
            const { languageCode, productId, attribute } = this.element;

            deleteAttributeValues().then(response => response.default({
                $axios: this.$axios,
                $store: this.$store,
                languageCode,
                elements: [attribute.element_id],
                productId,
            }).then(() => {
                this.isRequestPending = false;
                this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Value restored' });
                this.$emit('restore', { languageCode, productId, attribute });
                this.$emit('close');
            }).catch(() => {
                this.isRequestPending = false;
                this.$addAlert({ type: ALERT_TYPE.ERROR, message: 'Restore error' });
            }));
        },
    },
};
</script>
