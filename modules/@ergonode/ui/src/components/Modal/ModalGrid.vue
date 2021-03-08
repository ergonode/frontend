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
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ModalHeader from '@UI/components/Modal/ModalHeader';
import ModalOverlay from '@UI/components/Modal/ModalOverlay';

export default {
    name: 'ModalGrid',
    components: {
        ModalOverlay,
        ModalHeader,
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
        width: 1080px;
        height: 80%;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
