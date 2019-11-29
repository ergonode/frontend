/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar">
        <TitleBarHeader
            :title="title"
            :icon="icon"
            :is-breadcrumb="isBreadcrumb"
            @navigateback="onClick">
            <template #breadcrumb>
                <TitleBarBreadcrumb
                    v-for="(breadcrumb, index) in breadcrumbs"
                    :key="index"
                    :breadcrumb="breadcrumb" />
            </template>
            <template #badge>
                <slot name="prependBadge" />
                <InformationIconBadge
                    v-if="isReadOnly"
                    :background="blueColor"
                    :color="whiteColor"
                    title="READ ONLY">
                    <template #icon>
                        <IconLock
                            size="24"
                            :fill-color="whiteColor" />
                    </template>
                </InformationIconBadge>
            </template>
        </TitleBarHeader>
        <TitleBarActions>
            <slot name="subActions" />
            <slot name="mainAction" />
        </TitleBarActions>
    </div>
</template>

<script>
import { WHITE, BLUE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'TitleBar',
    components: {
        TitleBarHeader: () => import('~/core/components/TitleBar/TitleBarHeader'),
        TitleBarBreadcrumb: () => import('~/core/components/TitleBar/TitleBarBreadcrumb'),
        TitleBarActions: () => import('~/core/components/TitleBar/TitleBarActions'),
        InformationIconBadge: () => import('~/core/components/Badges/InformationIconBadge'),
        IconLock: () => import('~/components/Icon/Feedback/IconLock'),
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
        breadcrumbs: {
            type: Array,
            default: () => [],
        },
        isReadOnly: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        blueColor() {
            return BLUE;
        },
        isBreadcrumb() {
            return this.breadcrumbs.length > 0;
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
    .title-bar {
        display: flex;
        flex: 0 0 auto;
        justify-content: space-between;
        align-items: center;
        min-height: 32px;
        padding: 24px;
    }
</style>
