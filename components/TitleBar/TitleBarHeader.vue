/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar-header">
        <Component
            :is="headerIconComponent"
            v-if="icon && !isBreadcrumb"
            :fill-color="greenColor" />
        <FabButton
            v-if="isBreadcrumb"
            @click.native="onClick">
            <template #icon="{ color }">
                <IconArrowPointer :fill-color="color" />
            </template>
        </FabButton>
        <div class="title-bar-header__title">
            <span v-text="title" />
            <slot name="badge" />
        </div>
        <slot name="breadcrumb" />
    </div>
</template>

<script>
import { GREEN, WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'TitleBarHeader',
    components: {
        IconArrowPointer: () => import('~/components/Icon/Arrows/IconArrowPointer'),
        FabButton: () => import('~/components/Buttons/FabButton'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: null,
        },
        isBreadcrumb: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        greenColor() {
            return GREEN;
        },
        whiteColor() {
            return WHITE;
        },
        headerIconComponent() {
            return () => import(`~/components/Icon/Menu/Icon${this.icon}`);
        },
    },
    methods: {
        onClick() {
            this.$emit('navigateback');
        },
    },
};
</script>

<style lang="scss" scoped>
    .title-bar-header {
        display: grid;
        align-items: center;
        grid-column-gap: 8px;

        button {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
        }

        &__title {
            display: grid;
            align-items: center;
            grid-auto-flow: column;
            column-gap: 16px;
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            margin-left: 8px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_24_32;
        }
    }
</style>
