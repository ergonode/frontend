/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
            :theme="secondaryTheme"
            @click.native.prevent.stop="onClose">
            <template #icon="{ color }">
                <IconClose :fill-color="color" />
            </template>
        </Fab>
    </div>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ModalHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        classes() {
            return [
                'modal-header',
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
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 64px;
        padding: 16px 24px;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        border-bottom: $BORDER_1_GREY;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_20_24;
            word-break: break-word;
        }
    }

    .header-container {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 4px;
        align-items: center;
    }
</style>
