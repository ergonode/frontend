/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div class="header-container">
            <slot name="prepend" />
            <h2
                class="modal-header__title"
                v-text="title" />
        </div>
        <Fab
            data-cy="modal-close"
            :floating="{ top: '12px', right: '12px' }"
            :theme="secondaryTheme"
            @click.native="onClose">
            <template #icon="{ color }">
                <IconClose :fill-color="color" />
            </template>
        </Fab>
    </div>
</template>

<script>
import Fab from '@Core/components/Buttons/Fab';
import IconClose from '@Core/components/Icons/Window/IconClose';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ModalHeader',
    components: {
        Fab,
        IconClose,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
    },
    computed: {
        classes() {
            return [
                'modal-header',
                `modal-header--${this.size}`,
            ];
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
    .modal-header {
        $header: &;

        position: relative;
        min-height: 48px;
        padding: 24px 24px 0;
        box-sizing: border-box;

        &__title {
            color: $GRAPHITE_DARK;
        }

        &--small {
            #{$header}__title {
                font: $FONT_SEMI_BOLD_16_24;
            }
        }

        &--regular {
            #{$header}__title {
                font: $FONT_SEMI_BOLD_20_24;
            }
        }
    }

    .header-container {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 4px;
        align-items: center;
        padding-right: 24px;
    }
</style>
