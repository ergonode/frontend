/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div class="modal">
            <div class="modal__header">
                <div class="header-title">
                    <slot name="headerPrepend" />
                    <span v-text="title" />
                </div>
                <FabButton
                    :theme="secondaryTheme"
                    @click.native="onClose">
                    <template #icon="{ fillColor }">
                        <IconClose :fill-color="fillColor" />
                    </template>
                </FabButton>
            </div>
            <Divider />
            <div class="modal__body">
                <slot name="body" />
            </div>
            <div class="modal__footer">
                <slot name="footer" />
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import { THEMES } from '@Core/defaults/buttons';
import { WHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import Divider from '@Core/components/Dividers/Divider';
import FabButton from '@Core/components/Buttons/FabButton';
import IconClose from '@Core/components/Icons/Window/IconClose';

export default {
    name: 'Modal',
    components: {
        ModalOverlay,
        Divider,
        FabButton,
        IconClose,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
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
    .modal {
        display: flex;
        flex-direction: column;
        width: 400px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
        max-height: 100%;
        overflow: auto;

        &__header {
            display: flex;
            flex: 0;
            justify-content: space-between;
            padding: 16px 24px;

            .header-title {
                display: grid;
                grid-auto-flow: column;
                grid-column-gap: 4px;
                align-items: center;
                color: $GRAPHITE_DARK;
                font: $FONT_MEDIUM_24_32;
            }
        }

        &__body {
            flex: 1;
            overflow: auto;
        }

        &__footer {
            z-index: $Z_INDEX_LVL_1;
            display: flex;
            flex: 0;
            justify-content: space-between;
            padding: 16px 24px;
            box-shadow: $ELEVATOR_6_DP;
        }
    }
</style>
