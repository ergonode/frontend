/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay :value="value">
        <div class="modal">
            <div class="modal__header">
                <div class="header-title">
                    <slot name="headerPrepend" />
                    <span v-text="title" />
                </div>
                <FabButton
                    :theme="secondaryTheme"
                    @click.native="onClose">
                    <template #icon="{ color }">
                        <IconClose :fill-color="color" />
                    </template>
                </FabButton>
            </div>
            <Divider />
            <div class="modal__body">
                <Form>
                    <slot name="body" />
                </Form>
            </div>
            <div class="modal__footer">
                <slot name="footer" />
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import { THEMES } from '@Core/defaults/buttons';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';
import ModalOverlay from '@Core/components/Modal/ModalOverlay';
import Form from '@Core/components/Form/Form';
import Divider from '@Core/components/Dividers/Divider';
import FabButton from '@Core/components/Buttons/FabButton';
import IconClose from '~/components/Icon/Window/IconClose';

export default {
    name: 'Modal',
    components: {
        ModalOverlay,
        Form,
        Divider,
        FabButton,
        IconClose,
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
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
            this.$emit('input', false);
        },
        onApply() {
            this.$emit('apply');
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
            padding: 12px 24px;
            box-shadow: $ELEVATOR_6_DP;
        }
    }
</style>
