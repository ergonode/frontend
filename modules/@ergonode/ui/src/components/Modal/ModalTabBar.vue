/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div
            class="modal-tab-bar"
            data-cy="modal">
            <div class="fixed-width-container">
                <ModalHeader
                    :title="title"
                    @close="onClose" />
                <HorizontalTabBar :items="items" />
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ModalTabBar',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * List of items
         */
        items: {
            type: Array,
            default: () => [],
        },
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
    },
};
</script>

<style lang="scss" scoped>
    .modal-tab-bar {
        display: flex;
        width: 1080px;
        height: 80%;
        box-sizing: border-box;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }

    .fixed-width-container {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        width: 0;
    }

    .modal-header {
        border-bottom: none;
    }
</style>
