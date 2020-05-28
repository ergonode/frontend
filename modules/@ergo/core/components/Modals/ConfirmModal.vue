/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalConfirm
        :title="message"
        @close="onClose">
        <template #footer>
            <Button
                :title="agreeButtonText"
                @click.native="onAgree" />
            <Button
                title="CANCEL"
                :theme="secondaryTheme"
                @click.native="onClose" />
        </template>
    </ModalConfirm>
</template>

<script>
import { THEME } from '@Core/defaults/theme';

export default {
    name: 'ConfirmModal',
    components: {
        ModalConfirm: () => import('@Core/components/Modal/ModalConfirm'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    props: {
        message: {
            type: String,
            default: '',
        },
        agreeButton: {
            type: String,
            default: 'OK',
        },
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        agreeButtonText() {
            return this.agreeButton.toUpperCase();
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
        onAgree() {
            this.$emit('agree');
            this.$emit('close');
        },
    },
};
</script>
