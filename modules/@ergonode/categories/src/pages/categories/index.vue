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
                <Button
                    data-cy="new-category"
                    :title="$t('category.page.addButton')"
                    :size="smallSize"
                    :disabled="!isAllowedToCreate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar :items="tabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <CreateCategoryModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>
<script>
import PRIVILEGES from '@Categories/config/privileges';
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';

export default {
    name: 'Categories',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
        CreateCategoryModalForm: () => import('@Categories/components/Modals/CreateCategoryModalForm'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CATEGORY.namespace);
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        tabs() {
            return getNestedTabRoutes({
                hasAccess: this.$hasAccess,
                routes: this.$router.options.routes,
                route: this.$route,
            });
        },
    },
    head() {
        return {
            title: this.$t('category.page.head'),
        };
    },
};
</script>
