/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="header-title">
        <Icon
            v-if="icon && !isBreadcrumb"
            :class="['title__icon']"
            :icon="icon"
            size="medium" />
        <Button
            v-if="isBreadcrumb"
            class="back-btn"
            fab
            icon="arrow-dart-white trans-quarter"
            @click.native="onClick" />
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
        Icon: () => import('~/components/Icon/Icon'),
        Button: () => import('~/components/Buttons/Button'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
        isBreadcrumb: {
            type: Boolean,
            requestId: false,
            default: false,
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
