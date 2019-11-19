/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtLink
        class="breadcrumb"
        :to="breadcrumb.route">
        <Component
            :is="breadcrumbIconComponent"
            :fill-color="greenColor"
            size="16" />
        <span
            class="breadcrumb__title font--medium-14-20"
            v-text="breadcrumb.title" />
    </NuxtLink>
</template>

<script>
import { GREEN } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'TitleBarBreadcrumb',
    props: {
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
            return () => import(`~/components/Icon/Menu/Icon${this.breadcrumb.icon}`);
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
        }

        &:hover {
            text-decoration: underline;
        }
    }
</style>
