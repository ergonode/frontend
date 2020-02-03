/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="navigation-bar-breadcrumb">
        <Component
            :is="breadcrumbIcon"
            v-if="breadcrumb.icon"
            :fill-color="breadcrumbIconFillColor" />
        <NuxtLink
            v-if="breadcrumb.routePath"
            class="navigation-bar-breadcrumb__link"
            :to="breadcrumb.routePath"
            v-text="breadcrumb.title" />
        <span
            v-else
            class="navigation-bar-breadcrumb__title"
            v-text="breadcrumb.title" />
        <span class="navigation-bar-breadcrumb__divider">/</span>
    </div>
</template>

<script>
import { GREEN } from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NavigationBarBreadcrumb',
    props: {
        breadcrumb: {
            type: Object,
            required: true,
        },
    },
    computed: {
        breadcrumbIconFillColor() {
            return GREEN;
        },
        breadcrumbIcon() {
            return this.breadcrumb.icon || null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .navigation-bar-breadcrumb {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 8px;
        align-items: center;
        font: $FONT_MEDIUM_14_20;

        &__title, &__link {
            color: $WHITE;
        }

        &__link {
            text-decoration: none;
        }

        &__divider {
            color: $GREY_DARK;
        }
    }
</style>
