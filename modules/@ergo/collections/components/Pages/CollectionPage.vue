/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('PRODUCT_COLLECTION')">
            <template #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE COLLECTION"
                    :disabled="!$hasAccess(['PRODUCT_COLLECTION_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
                <Button
                    title="ADD PRODUCTS TO COLLECTION"
                    :size="smallSize"
                    :disabled="!$hasAccess(['PRODUCT_COLLECTION_UPDATE'])"
                    @click.native="onShowModal">
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
        <AddProductsToCollectionModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @added="onCreatedData" />
        <Footer flex-end>
            <Button
                title="SAVE COLLECTION"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'CollectionPage',
    components: {
        AddProductsToCollectionModalForm: () => import('@Collections/components/Modals/AddProductsToCollectionModalForm'),
    },
    mixins: [categoryManagementPageMixin, gridModalMixin],
};
</script>
