/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Category trees"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <CreateCategoryTreeButton @created="onCreatedData" />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
    </Page>
</template>

<script>
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import CreateCategoryTreeButton from '@Trees/components/Buttons/CreateCategoryTreeButton';
import PRIVILEGES from '@Trees/config/privileges';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import HorizontalRoutingTabBarContent from '@UI/components/TabBar/Routing/HorizontalRoutingTabBarContent';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'CategoryTrees',
    components: {
        CreateCategoryTreeButton,
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        HorizontalRoutingTabBarContent,
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CATEGORY_TREE.namespace);
        },
    },
    head() {
        return {
            title: 'Category trees - Ergonode',
        };
    },
};
</script>
