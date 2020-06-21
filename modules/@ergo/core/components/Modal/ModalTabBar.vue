/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div class="modal-tab-bar">
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
    </ModalOverlay>
</template>

<script>
import Fab from '@Core/components/Buttons/Fab';
import IconClose from '@Core/components/Icons/Window/IconClose';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import HorizontalTabBar from '@Core/components/TabBar/HorizontalTabBar';
import { THEME } from '@Core/defaults/theme';

export default {
    name: 'ModalTabBar',
    components: {
        ModalOverlay,
        HorizontalTabBar,
        Fab,
        IconClose,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
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
</style>
