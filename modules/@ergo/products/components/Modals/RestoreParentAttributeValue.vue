/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Restore parent value"
        @close="onClose">
        <template #body>
            <span>dsfdfsd</span>
        </template>
        <template #footer>
            <Button
                title="RESTORE"
                :disabled="isRequestPending"
                @click.native="onRestore" />
            <Button
                title="CANCEL"
                :theme="secondaryTheme"
                :disabled="isRequestPending"
                @click.native="onClose" />
        </template>
    </ModalForm>
</template>

<script>
import { THEME } from '@Core/defaults/theme';

// const deleteAttributeValues = () => import('@Products/services/deleteAttributeValues.service');

export default {
    name: 'RestoreParentAttributeValue',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        // ProductForm: () => import('@Products/components/Forms/ProductForm'),
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
            console.log('sdfsfgfggggg');
        },
    },
};
</script>
