/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar__details">
        <Component
            :is="headerIconComponent"
            v-if="icon && !isBreadcrumb"
            :fill-color="greenColor" />
        <Button
            v-if="isBreadcrumb"
            class="details__back-btn"
            fab
            @click.native="onClick">
            <template #prepend>
                <IconArrowPointer :fill-color="whiteColor" />
            </template>
        </Button>
        <div class="vertical-wrapper">
            <span
                class="details__title font--medium-24-32"
                v-text="title" />
            <slot name="badge" />
        </div>
        <slot name="breadcrumb" />
    </div>
</template>

<script>
import { GREEN, WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'TitleBarDetails',
    components: {
        IconArrowPointer: () => import('~/components/Icon/Arrows/IconArrowPointer'),
        Button: () => import('~/components/Buttons/Button'),
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
    .title-bar__details {
        display: grid;
        align-items: center;
        grid-gap: 0 8px;

        .details__back-btn {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
        }

        .details__title {
            margin-right: 8px;
            color: $GRAPHITE_DARK;
        }

        .vertical-wrapper {
            display: flex;
            align-items: center;
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            margin-left: 8px;
        }
    }
</style>
