/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['breadcrumb', {'breadcrumb--hover': isMouseOver}]"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut"
        @click="onClick">
        <Component
            :is="breadcrumbIconComponent"
            :fill-color="breadcrumbIconColor"
            size="16" />
        <span
            class="breadcrumb__title typo-subtitle txt--graphite"
            v-text="breadcrumb.title" />
    </div>
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
    data() {
        return {
            isMouseOver: false,
            breadcrumbIconColor: '#5C5F65',
        };
    },
    computed: {
        breadcrumbIconComponent() {
            return () => import(`~/components/Icon/Menu/Icon${this.breadcrumb.icon}`);
        },
    },
    methods: {
        onMouseOver() {
            this.breadcrumbIconColor = '#00bc87';
            this.isMouseOver = true;
        },
        onMouseOut() {
            this.breadcrumbIconColor = '#5C5F65';
            this.isMouseOver = false;
        },
        onClick() {
            this.$router.push(this.breadcrumb.path);
        },
    },
};
</script>

<style lang="scss" scoped>
    .breadcrumb {
        display: flex;
        align-items: center;

        &__title {
            margin-left: 6px;
        }

        &--hover {
            cursor: pointer;
        }
    }
</style>
