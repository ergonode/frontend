/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar__details">
        <Component
            :is="headerIconComponent"
            v-if="icon && !isBreadcrumb"
            fill-color="#00bc87" />
        <Button
            v-if="isBreadcrumb"
            class="details__back-btn"
            fab
            @click.native="onClick">
            <template #prepend>
                <IconArrowPointer fill-color="#fff" />
            </template>
        </Button>
        <div class="vertical-wrapper">
            <span
                class="details__title"
                v-text="title" />
            <slot name="badge" />
        </div>
        <slot name="breadcrumb" />
    </div>
</template>

<script>
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
