/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay @close="onClose">
        <div
            data-cy="modal"
            class="modal-form">
            <div class="modal-form__header">
                <div class="header-title">
                    <slot name="headerPrepend" />
                    <h2 v-text="title" />
                </div>
                <Fab
                    data-cy="modalClose"
                    :theme="secondaryTheme"
                    @click.native="onClose">
                    <template #icon="{ color }">
                        <IconClose :fill-color="color" />
                    </template>
                </Fab>
            </div>
            <div class="modal-form__body">
                <slot name="body" />
            </div>
            <div class="modal-form__footer">
                <slot name="footer" />
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import { THEME } from '@Core/defaults/theme';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import Fab from '@Core/components/Buttons/Fab';
import IconClose from '@Core/components/Icons/Window/IconClose';

export default {
    name: 'ModalForm',
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
    .modal-form {
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
            padding: 24px 12px 0 24px;

            .header-title {
                display: grid;
                grid-auto-flow: column;
                grid-column-gap: 4px;
                align-items: center;
                color: $GRAPHITE_DARK;
                font: $FONT_SEMI_BOLD_20_24;
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
            box-shadow: $ELEVATOR_6_DP;
        }
    }
</style>
