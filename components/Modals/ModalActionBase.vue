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
                            class="title"
                            v-text="title" />
                    </div>
                    <Button
                        fab
                        color="transparent"
                        @click.native="onClose">
                        <template #prepend>
                            <IconClose />
                        </template>
                    </Button>
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

import ModalBase from '~/components/Modals/ModalBase';
import Button from '~/components/Buttons/Button';
import Divider from '~/components/Dividers/Divider';
import IconClose from '~/components/Icon/Window/IconClose';

export default {
    name: 'ModalActionBase',
    components: {
        Divider, ModalBase, Button, IconClose,
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
                font: 500 24px/32px "Inter UI";
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
