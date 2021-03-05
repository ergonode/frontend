/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                    <TabBarNoDataPlaceholder
                        v-else
                        title="Nothing to see here"
                        subtitle="This product has not been added to any collection.">
                        <template #action>
                            <Button
                                title="GO TO COLLECTIONS"
                                :size="smallSize"
                                :disabled="!isAllowedToUpdate"
                                @click.native="onNavigateToCollections" />
                        </template>
                    </TabBarNoDataPlaceholder>
                </template>
            </div>
        </template>
    </CenterViewTemplate>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import {
    ROUTE_NAME,
} from '@Collections/config/routes';
import ProductCollection from '@Collections/extends/product/components/Collection/ProductCollection';
import ProductCollectionItem from '@Collections/extends/product/components/Collection/ProductCollectionItem';
import ExpandingCollection from '@Collections/extends/product/components/ExpandingCollection/ExpandingCollection';
import {
    SIZE,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import Preloader from '@UI/components/Preloader/Preloader';
import TabBarNoDataPlaceholder from '@UI/components/TabBar/TabBarNoDataPlaceholder';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductCollectionTab',
    components: {
        Preloader,
        CenterViewTemplate,
        ProductCollection,
        ProductCollectionItem,
        TabBarNoDataPlaceholder,
        ExpandingCollection,
        Button,
    },
    data() {
        return {
            collections: [],
            isFetchingData: true,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
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
        onNavigateToCollections() {
            this.$router.push({
                name: ROUTE_NAME.COLLECTIONS_GRID,
            });
        },
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
