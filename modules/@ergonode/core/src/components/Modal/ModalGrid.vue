/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div class="modal-grid">
            <ModalHeader
                :title="title"
                @close="onClose">
                <template #prepend>
                    <slot name="prependHeader" />
                </template>
            </ModalHeader>
            <slot name="body" />
        </div>
    </ModalOverlay>
</template>

<script>
import ModalHeader from '@Core/components/Modal/ModalHeader';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ModalGrid',
    components: {
        ModalOverlay,
        ModalHeader,
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
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal-grid {
        display: flex;
        flex-direction: column;
        width: 960px;
        height: 80%;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;

        &__header {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_20_24;
        }
    }
</style>
