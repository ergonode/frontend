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
                            @fetch="fetchCollectionItems">
                            <template #item="{ item }">
                                <ProductCollectionItem :item="item" />
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
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductCollectionTab',
    components: {
        ProductWithoutCollectionTabBarNoDataPlaceholder,
        Preloader,
        CenterViewTemplate,
        ProductCollection,
        ProductCollectionItem,
        ExpandingCollection,
    },
    data() {
        return {
            collections: [],
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
        fetchCollectionItems({
            id, index,
        }) {
            this.$axios.$get(`collections/${id}/elements`).then(({
                collection,
            }) => {
                this.collections[index].items = collection.map(({
                    sku,
                    default_image,
                    system_name,
                }) => ({
                    description: system_name || sku,
                    image: default_image,
                }));
            });
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
