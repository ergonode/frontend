/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div
            data-cy="modal"
            class="modal-confirm">
            <div class="modal-confirm__header">
                <div class="header-title">
                    <slot name="headerPrepend" />
                    <h3 v-text="title" />
                </div>
                <Fab
                    data-cy="modal-close"
                    :theme="secondaryTheme"
                    @click.native="onClose">
                    <template #icon="{ color }">
                        <IconClose :fill-color="color" />
                    </template>
                </Fab>
            </div>
            <div class="modal-confirm__footer">
                <slot name="footer" />
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import Fab from '@Core/components/Buttons/Fab';
import IconClose from '@Core/components/Icons/Window/IconClose';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import { THEME } from '@Core/defaults/theme';

export default {
    name: 'ModalConfirm',
    components: {
        ModalOverlay,
        Fab,
        IconClose,
    },
    props: {
        title: {
            type: String,
            default: '',
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
    .modal-confirm {
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
            padding: 24px 16px 0 24px;

            .header-title {
                padding-right: 16px;
                color: $GRAPHITE_DARK;
                font: $FONT_SEMI_BOLD_16_24;
            }
        }

        &__body {
            flex: 1;
            padding: 24px 24px 32px;
            overflow: auto;
        }

        &__footer {
            z-index: $Z_INDEX_LVL_1;
            display: flex;
            flex: 0;
            justify-content: space-between;
            padding: 16px 24px;
        }
    }
</style>
