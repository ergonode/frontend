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
    name: 'GridCategoryPage',
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
        this.Privilege = new Privilege(this.$hasAccess, 'CATEGORY');
        this.tabs = [];
        if (this.$hasAccess('CATEGORY_READ')) {
            this.tabs.push({
                title: 'Categories',
                path: '/categories/grid',
                active: true,
                isContextualMenu: false,
            });
        }
    },
    beforeDestroy() {
        delete this.tabs;
        delete this.Privilege;
    },
};
</script>
