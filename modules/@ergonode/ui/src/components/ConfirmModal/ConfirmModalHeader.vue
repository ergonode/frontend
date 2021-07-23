/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <h2
            v-if="title"
            class="modal-confirm-header__title"
            v-text="title" />
        <span
            v-if="subtitle"
            class="modal-confirm-header__subtitle"
            v-text="subtitle" />
        <Fab
            data-cy="modal-close"
            :floating="{ top: '16px', right: '16px' }"
            :theme="secondaryTheme"
            @click.native="onClose">
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
    name: 'ConfirmModalHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: '',
        },
    },
    computed: {
        classes() {
            return [
                'modal-confirm-header',
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
    .modal-confirm-header {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 24px 48px 16px 24px;
        box-sizing: border-box;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_16_24;
            margin-bottom: 8px;
        }

        &__subtitle {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
