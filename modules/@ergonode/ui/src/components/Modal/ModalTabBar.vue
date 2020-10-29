/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div class="modal-tab-bar">
            <div class="fixed-width-container">
                <HorizontalTabBar :items="items">
                    <template #appendItems>
                        <Fab
                            data-cy="modalClose"
                            :floating="{ right: '8px' }"
                            :theme="secondaryTheme"
                            @click.native="onClose">
                            <template #icon="{ color }">
                                <IconClose :fill-color="color" />
                            </template>
                        </Fab>
                    </template>
                </HorizontalTabBar>
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';
import Fab from '@UI/components/Fab/Fab';
import IconClose from '@UI/components/Icons/Window/IconClose';
import ModalOverlay from '@UI/components/Modal/ModalOverlay';
import HorizontalTabBar from '@UI/components/TabBar/HorizontalTabBar';

export default {
    name: 'ModalTabBar',
    components: {
        ModalOverlay,
        HorizontalTabBar,
        Fab,
        IconClose,
    },
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
        width: 960px;
        padding-top: 8px;
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
</style>
