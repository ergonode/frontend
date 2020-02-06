/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Categories"
            :is-read-only="$isReadOnly('CATEGORY')">
            <template #mainAction>
                <Button
                    title="NEW CATEGORY"
                    :size="smallSize"
                    :disabled="!$hasAccess(['CATEGORY_CREATE'])"
                    @click.native="addCategory">
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
        <CreateCategoryModalForm
            v-if="isCreateCategoryVisible"
            @close="onCloseModal"
            @created="onCreatedCategory" />
    </Page>
</template>
<script>
import { SIZES } from '@Core/defaults/buttons';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    name: 'Categories',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        HorizontalTabBarContent: () => import('@Core/components/Tab/HorizontalTabBarContent'),
        CreateCategoryModalForm: () => import('@Categories/components/Modals/CreateCategoryModalForm'),
        Button,
        IconAdd,
    },
    data() {
        return {
            isCreateCategoryVisible: false,
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
        addCategory() {
            this.isCreateCategoryVisible = true;
        },
        onCloseModal() {
            this.isCreateCategoryVisible = false;
        },
        onCreatedCategory() {
            this.isCreateCategoryVisible = false;
            this.fetchGridData = true;
        },
        onFetchedGridData() {
            this.fetchGridData = false;
        },
    },
};
</script>
