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
            :is-read-only="isReadOnly" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import Privilege from '~/model/privilege';

export default {
    name: 'GridSegmentsPage',
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
            default: null,
        },
    },
    beforeCreate() {
        this.Privilege = new Privilege(this.$hasAccess, 'SEGMENT');
        this.tabs = [];
        if (this.$hasAccess('SEGMENT_READ')) {
            this.tabs.push({
                title: 'Segments',
                path: '/segments/grid',
                active: true,
                isContextualMenu: false,
            });
        }
        if (this.$hasAccess('CONDITION_READ')) {
            this.tabs.push({
                title: 'Condition sets',
                path: '/segments/condition-sets',
                active: true,
                isContextualMenu: false,
            });
        }
    },
    computed: {
        isReadOnly() {
            const isConditionPage = /condition-sets/.test(this.$route.path);
            let PrivilegeInstance = new Privilege(this.$hasAccess, 'SEGMENT');
            if (isConditionPage) {
                PrivilegeInstance = new Privilege(this.$hasAccess, 'CONDITION');
            }
            return PrivilegeInstance.isReadOnly;
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
