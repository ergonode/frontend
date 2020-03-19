/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('PRODUCT_COLLECTION')"
            @navigateBack="onDismiss">
            <template #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE PRODUCT COLLECTION"
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
                title="SAVE PRODUCT COLLECTION"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import categoryManagementPageBaseMixin from '@Core/mixins/page/categoryManagementPageBaseMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';

export default {
    name: 'CollectionPage',
    components: {
        IconAdd,
        AddProductsToCollectionModalForm: () => import('@Collections/components/Modals/AddProductsToCollectionModalForm'),
    },
    mixins: [categoryManagementPageBaseMixin, gridModalMixin],
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
};
</script>
