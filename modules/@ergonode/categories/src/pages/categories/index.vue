/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('category.page.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <CreateCategoryButton @created="onCreatedData" />
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
import CreateCategoryButton from '@Categories/components/Buttons/CreateCategoryButton';
import PRIVILEGES from '@Categories/config/privileges';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'Categories',
    components: {
        CreateCategoryButton,
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CATEGORY.namespace);
        },
    },
    head() {
        return {
            title: this.$t('category.page.head'),
        };
    },
};
</script>
