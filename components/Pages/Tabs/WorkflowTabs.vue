/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :icon="icon"
            :is-read-only="$isReadOnly('WORKFLOW')" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
export default {
    name: 'WorkflowTabs',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
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
            required: false,
            default: null,
        },
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('WORKFLOW_READ')) {
            this.tabs.push({
                title: 'Product statuses',
                route: { name: 'workflow-statuses' },
                active: true,
                isContextualMenu: false,
            });
            this.tabs.push({
                title: 'Transitions',
                route: { name: 'workflow-transitions' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
