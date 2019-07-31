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
            class="back-btn"
            fab
            @click.native="onClick">
            <template v-slot:prepend>
                <IconArrowPointer fill-color="#fff" />
            </template>
        </Button>
        <div
            class="vertical-wrapper">
            <span class="typo-title txt--dark-graphite">
                {{ title }}
            </span>
            <slot name="breadcrumb" />
        </div>
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
        display: flex;
        justify-content: center;
        align-items: center;

        .back-btn {
            margin-right: 8px;
        }

        .vertical-wrapper {
            display: flex;
            flex-direction: column;
            padding-left: 8px;
        }
    }
</style>
