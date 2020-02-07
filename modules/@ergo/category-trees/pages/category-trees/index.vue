/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Category trees"
            :is-read-only="$isReadOnly('CATEGORY_TREE')">
            <template #mainAction>
                <Button
                    title="NEW TREE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['CATEGORY_TREE_CREATE'])"
                    @click.native="addCategoryTree">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs">
            <template #item>
                <HorizontalTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalTabBar>
        <CreateCategoryTreeModalForm
            v-if="isCreateCategoryTreeVisible"
            @close="onCloseModal"
            @created="onCreatedCategoryTree" />
    </Page>
</template>

<script>
import { SIZES } from '@Core/defaults/buttons';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    name: 'CategoryTrees',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        HorizontalTabBarContent: () => import('@Core/components/Tab/HorizontalTabBarContent'),
        CreateCategoryTreeModalForm: () => import('@Trees/components/Modals/CreateCategoryTreeModalForm'),
        Button,
        IconAdd,
    },
    data() {
        return {
            isCreateCategoryTreeVisible: false,
            fetchGridData: false,
        };
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    methods: {
        addCategoryTree() {
            this.isCreateCategoryTreeVisible = true;
        },
        onCloseModal() {
            this.isCreateCategoryTreeVisible = false;
        },
        onCreatedCategoryTree() {
            this.isCreateCategoryTreeVisible = false;
            this.fetchGridData = true;
        },
        onFetchedGridData() {
            this.fetchGridData = false;
        },
    },
};
</script>
