/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalBase :value="value">
        <template #content>
            <div class="modal__header">
                <slot name="header">
                    <div class="horizontal-wrapper">
                        <Component :is="headerIconComponent" />
                        <span
                            class="title font--medium-24-32"
                            v-text="title" />
                    </div>
                    <FabButton
                        :theme="secondaryTheme"
                        @click.native="onClose">
                        <template #icon="{ color }">
                            <IconClose :fill-color="color" />
                        </template>
                    </FabButton>
                </slot>
            </div>
            <Divider />
            <div class="modal__content">
                <slot name="body" />
            </div>
            <div class="modal__footer">
                <slot name="footer" />
            </div>
        </template>
    </ModalBase>
</template>

<script>
import { THEMES } from '~/defaults/buttons';
import ModalBase from '~/components/Modals/ModalBase';
import FabButton from '~/components/Buttons/FabButton';
import Divider from '~/components/Dividers/Divider';
import IconClose from '~/components/Icon/Window/IconClose';

export default {
    name: 'ModalActionBase',
    components: {
        Divider, ModalBase, FabButton, IconClose,
    },
    props: {
        value: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: 'Default header',
        },
        iconPath: {
            type: String,
            default: '',
        },
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        headerIconComponent() {
            return () => import(`~/components/Icon/${this.iconPath}`);
        },
    },
    methods: {
        onClose() {
            this.$emit('input', false);
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal {
        &__header {
            padding: 16px 24px;

            .horizontal-wrapper {
                display: flex;
                align-items: center;
            }

            .title {
                color: $GRAPHITE_DARK;
                margin-left: 12px;
            }
        }

        &__content {
            display: grid;
            flex: 0;
            row-gap: 16px;
            padding: 16px 24px;
            overflow: auto;
        }

        &__footer {
            padding: 12px 24px;
            box-shadow: $ELEVATOR_6_DP;
        }

        &__header, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
        }
    }
</style>
