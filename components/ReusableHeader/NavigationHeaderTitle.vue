/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="header-title">
        <Component
            :is="headerIconComponent"
            v-if="icon && !isBreadcrumb"
            fill-color="#00bc87" />
        <Button
            v-if="isBreadcrumb"
            class="header-title__back-btn"
            fab
            @click.native="onClick">
            <template v-slot:prepend>
                <IconArrowPointer fill-color="#fff" />
            </template>
        </Button>
        <div class="vertical-wrapper">
            <span
                class="header-title__title"
                v-text="title" />
            <slot name="badge" />
        </div>
        <slot name="breadcrumb" />
    </div>
</template>

<script>
export default {
    name: 'NavigationHeaderTitle',
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
    .header-title {
        display: grid;
        align-items: center;
        grid-gap: 0 8px;

        &__back-btn {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
        }

        &__title {
            @include setFont(medium, huge, large, $darkGraphite);
            margin-right: 8px;
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
