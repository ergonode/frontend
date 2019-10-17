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
            fill-color="#00bc87"
            size="16" />
        <span
            class="breadcrumb__title"
            v-text="breadcrumb.title" />
    </NuxtLink>
</template>

<script>
export default {
    name: 'NavigationHeaderBreadcrumb',
    props: {
        breadcrumb: {
            type: Object,
            required: true,
        },
    },
    computed: {
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
        grid-column-gap: 6px;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        margin-left: 8px;
        text-decoration: none;

        &__title {
            @include setFont(medium, regular, semiRegular, $darkGraphite);

            margin-left: 4px;
        }

        &:hover {
            text-decoration: underline;
        }
    }
</style>
