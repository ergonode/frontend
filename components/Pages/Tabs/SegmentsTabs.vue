/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :buttons="buttons"
            :icon="icon"
            :is-read-only="isReadOnly" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'SegmentsTabs',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            required: true,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('SEGMENT_READ')) {
            this.tabs.push({
                title: 'Segments',
                route: { name: 'segments-grid' },
                active: true,
                isContextualMenu: false,
            });
        }
        if (this.$hasAccess('CONDITION_READ')) {
            this.tabs.push({
                title: 'Condition sets',
                route: { name: 'condition-sets' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    computed: {
        isReadOnly() {
            const isConditionPage = /condition-sets/.test(this.$route.path);
            if (isConditionPage) {
                return this.$isReadOnly('CONDITION');
            }
            return this.$isReadOnly('SEGMENT');
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
