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
    name: 'GridAttributePage',
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
        this.Privilege = new Privilege(this.$hasAccess, 'ATTRIBUTE');
        this.tabs = [];
        if (this.$hasAccess('ATTRIBUTE_READ')) {
            this.tabs.push({
                title: 'Attributes',
                path: '/attributes/grid',
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
