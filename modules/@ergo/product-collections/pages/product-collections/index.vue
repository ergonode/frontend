/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Product collections"
            :is-read-only="$isReadOnly('PRODUCT_COLLECTION')">
            <template #mainAction>
                <Button
                    title="NEW PRODUCT COLLECTION"
                    :size="smallSize"
                    :disabled="!$hasAccess(['PRODUCT_COLLECTION_CREATE'])"
                    @click.native="addProductCollection">
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
        <CreateProductCollectionModalForm
            v-if="isCreateProductCollectionVisible"
            @close="onCloseModal"
            @created="onCreatedProduct" />
    </Page>
</template>

<script>
import { SIZES } from '@Core/defaults/buttons';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    name: 'ProductCollections',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        HorizontalTabBarContent: () => import('@Core/components/Tab/HorizontalTabBarContent'),
        CreateProductCollectionModalForm: () => import('@Collections/components/Modals/CreateProductCollectionModalForm'),
        Button,
        IconAdd,
    },
    data() {
        return {
            isCreateProductCollectionVisible: false,
            fetchGridData: false,
        };
    },
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addProductCollection() {
            this.isCreateProductCollectionVisible = true;
        },
        onCloseModal() {
            this.isCreateProductCollectionVisible = false;
        },
        onCreatedProduct() {
            this.isCreateProductCollectionVisible = false;
            this.fetchGridData = true;
        },
        onFetchedGridData() {
            this.fetchGridData = false;
        },
    },
};
</script>
