/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
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
                    title="Nothing to see here"
                    subtitle="This product has not been added to any collection"
                    :layout-orientation="horizontalOrientation"
                    :bg-url="require('@Core/assets/images/placeholders/comments.svg')">
                    <template #append>
                        <Button
                            class="navigate-to-collections-button"
                            title="GO TO COLLECTIONS"
                            :size="smallSize"
                            @click.native="onNavigateToCollections" />
                    </template>
                </ListPlaceholder>
            </div>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import {
    SIZE,
} from '@Core/defaults/theme';
import ProductCollection from '@Products/components/ProductCollection/ProductCollection';
import ProductCollectionItem from '@Products/components/ProductCollection/ProductCollectionItem';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductCollectionTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ProductCollection,
        ProductCollectionItem,
        ExpandingCollection: () => import('@Core/components/ExpandingCollection/ExpandingCollection'),
        ListPlaceholder: () => import('@Core/components/List/ListPlaceholder'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    data() {
        return {
            collections: [
            ],
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    async created() {
        const {
            collection: types,
        } = await this.$axios.$get(`${this.languageCode}/collections/type`);
        const {
            collection: collections,
        } = await this.$axios.$get(`${this.languageCode}/products/${this.$route.params.id}/collections`);

        this.collections = collections.map(({
            id, code, name, description, elements_count, type_id,
        }) => {
            const collectionType = types.find(type => type.id === type_id);
            return {
                id,
                title: name || `#${code}`,
                subtitle: collectionType ? collectionType.name : '',
                description,
                itemsCount: elements_count,
                items: [
                ],
            };
        });
    },
    methods: {
        onNavigateToCollections() {
            this.$router.push({
                name: 'collections-grid',
            });
        },
        fetchCollectionItems({
            id, index,
        }) {
            this.$axios.$get(`${this.$store.state.authentication.user.language}/collections/${id}/elements`).then(({
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

    .navigate-to-collections-button {
        margin-top: 16px;
    }
</style>
