/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtLink
        class="breadcrumb"
        aria-label="Breadcrumb"
        :to="breadcrumb.route">
        <Component
            :is="breadcrumbIconComponent"
            :fill-color="greenColor"
            width="16"
            height="16" />
        <span
            class="breadcrumb__title"
            v-text="breadcrumb.title" />
    </NuxtLink>
</template>

<script>
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'TitleBarBreadcrumb',
    props: {
        /**
         * Breadcrumb data model
         */
        breadcrumb: {
            type: Object,
            required: true,
        },
    },
    computed: {
        greenColor() {
            return GREEN;
        },
        breadcrumbIconComponent() {
            return () => import(`@Core/components/Icons/Menu/Icon${this.breadcrumb.icon}`);
        },
    },
};
</script>

<style lang="scss" scoped>
    .breadcrumb {
        display: flex;
        align-items: center;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        margin-left: 8px;
        text-decoration: none;

        &:active {
            color: inherit;
        }

        &__title {
            margin-left: 4px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }

        &:hover {
            text-decoration: underline;
        }
    }
</style>
