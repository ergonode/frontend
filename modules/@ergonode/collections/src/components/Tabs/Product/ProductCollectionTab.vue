/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <div class="product-collection-container">
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
                <ListPlaceholder
                    v-else
                    style="width: 560px;"
                    title="Nothing to see here"
                    subtitle="This product has not been added to any collection"
                    :layout-orientation="horizontalOrientation"
                    :bg-url="require('@Core/assets/images/placeholders/comments.svg')">
                    <template #action>
                        <Button
                            title="GO TO COLLECTIONS"
                            :size="smallSize"
                            @click.native="onNavigateToCollections" />
                    </template>
                </ListPlaceholder>
            </div>
        </template>
    </CenterViewTemplate>
</template>

<script>
import ProductCollection from '@Collections/components/ProductCollection/ProductCollection';
import ProductCollectionItem from '@Collections/components/ProductCollection/ProductCollectionItem';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductCollectionTab',
    components: {
        CenterViewTemplate,
        ProductCollection,
        ProductCollectionItem,
        ExpandingCollection: () => import('@Core/components/ExpandingCollection/ExpandingCollection'),
        ListPlaceholder: () => import('@Core/components/List/ListPlaceholder'),
        Button: () => import('@Core/components/Button/Button'),
    },
    data() {
        return {
            collections: [],
        };
    },
    computed: {
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    async created() {
        const [
            options,
            collection,
        ] = await Promise.all([
            this.getCollectionTypeOptions(),
            this.getProductCollections(),
        ]);

        this.collections = collection
            .map(({
                id,
                code,
                name,
                description,
                elements_count,
                type_id,
            }) => {
                const collectionType = options
                    .find(type => type.id === type_id);

                return {
                    id,
                    title: name || `#${code}`,
                    subtitle: collectionType ? collectionType.name : '',
                    description,
                    itemsCount: elements_count,
                    items: [],
                };
            });
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
                name: 'collections-grid',
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
