/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <div class="product-collection-container">
                <Preloader v-if="isFetchingData" />
                <template v-else>
                    <ProductCollection v-if="collections.length">
                        <ExpandingCollection
                            v-for="(collection, index) in collections"
                            :key="collection.id"
                            :index="index"
                            :collection="collection"
                            :is-prefetching-data="fetchingCollectionIndex === index"
                            @fetch="fetchCollectionItems">
                            <template #item="{ item, itemIndex }">
                                <ProductCollectionItem
                                    :key="itemIndex"
                                    :item="item" />
                            </template>
                        </ExpandingCollection>
                    </ProductCollection>
                    <ProductWithoutCollectionTabBarNoDataPlaceholder v-else />
                </template>
            </div>
        </template>
    </CenterViewTemplate>
</template>

<script>
import ProductCollection from '@Collections/extends/product/components/Collection/ProductCollection';
import ProductCollectionItem from '@Collections/extends/product/components/Collection/ProductCollectionItem';
import ExpandingCollection from '@Collections/extends/product/components/ExpandingCollection/ExpandingCollection';
import ProductWithoutCollectionTabBarNoDataPlaceholder
    from '@Collections/extends/product/components/Placeholders/ProductWithoutCollectionTabBarNoDataPlaceholder';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductCollectionTab',
    components: {
        ProductWithoutCollectionTabBarNoDataPlaceholder,
        ProductCollection,
        ProductCollectionItem,
        ExpandingCollection,
    },
    data() {
        return {
            collections: [],
            fetchingCollectionIndex: -1,
            isFetchingData: true,
        };
    },
    async created() {
        let productCollections = [];
        let productCollectionTypes = [];

        await Promise.all([
            this.getCollectionTypeOptions({
                onSuccess: (({
                    types,
                }) => {
                    productCollectionTypes = types;
                }),
            }),
            this.getProductCollections({
                onSuccess: (({
                    collections,
                }) => {
                    productCollections = collections;
                }),
            }),
        ]);

        this.collections = productCollections
            .map(({
                id,
                code,
                name,
                description,
                elements_count,
                type_id,
            }) => {
                const collectionType = productCollectionTypes.find(type => type.id === type_id);

                return {
                    id,
                    title: name || `#${code}`,
                    subtitle: collectionType ? collectionType.name : '',
                    description,
                    itemsCount: elements_count,
                    items: [],
                };
            });

        this.isFetchingData = false;
    },
    methods: {
        ...mapActions('product', [
            'getProductCollections',
        ]),
        ...mapActions('collection', [
            'getCollectionTypeOptions',
        ]),
        async fetchCollectionItems({
            id,
            index,
        }) {
            this.fetchingCollectionIndex = index;

            const {
                collection,
            } = await this.$axios.$get(`collections/${id}/elements`);

            this.collections[index].items = collection.map(({
                sku,
                default_image,
                system_name,
                _links,
            }) => ({
                description: system_name || sku,
                image: default_image,
                actions: {
                    ..._links,
                },
            }));

            this.fetchingCollectionIndex = -1;
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-collection-container {
        display: flex;
        align-items: center;
        padding: 24px;
    }
</style>
