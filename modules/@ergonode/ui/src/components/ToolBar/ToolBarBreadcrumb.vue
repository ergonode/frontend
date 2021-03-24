/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tool-bar-breadcrumb">
        <Component
            :is="breadcrumbIcon"
            v-if="breadcrumb.icon"
            :fill-color="breadcrumbIconFillColor" />
        <NuxtLink
            v-if="breadcrumb.id"
            class="tool-bar-breadcrumb__link"
            :to="{
                name: breadcrumb.routeName,
                params: { id: $route.params[breadcrumb.id]}
            }"
            v-text="breadcrumb.title" />
        <NuxtLink
            v-else-if="breadcrumb.routeName"
            class="tool-bar-breadcrumb__link"
            :to="{ name: breadcrumb.routeName }"
            v-text="breadcrumb.title" />
        <span
            v-else
            class="tool-bar-breadcrumb__title"
            v-text="breadcrumb.title" />
        <span class="tool-bar-breadcrumb__divider">/</span>
    </div>
</template>

<script>
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ToolBarBreadcrumb',
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
    .tool-bar-breadcrumb {
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
