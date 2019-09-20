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
            :is-read-only="Privilege.isReadOnly" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import Privilege from '~/model/privilege';

export default {
    name: 'GridWorkflowPage',
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
        this.Privilege = new Privilege(this.$hasAccess, 'WORKFLOW');
        this.tabs = [];
        if (this.$hasAccess('WORKFLOW_READ')) {
            this.tabs.push({
                title: 'Product statuses',
                path: '/workflow/statuses',
                active: true,
                isContextualMenu: false,
            });
        }
    },
    beforeDestroy() {
        delete this.Privilege;
        delete this.tabs;
    },
};
</script>
