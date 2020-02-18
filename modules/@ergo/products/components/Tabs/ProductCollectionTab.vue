/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <div class="container">
                    <VerticalCenteredView>
                        <div class="collections">
                            <ExpandingCollection>
                                <template #item="{ item }">
                                    <ProductCollectionItem :item="item" />
                                </template>
                            </ExpandingCollection>
                        </div>
                    </VerticalCenteredView>
                </div>
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '@Core/components/Layout/VerticalCenteredView';
import ExpandingCollection from '@Core/components/ExpandingCollection/ExpandingCollection';
import ProductCollectionItem from '@Products/components/ExpandingCollection/ProductCollectionItem';

export default {
    name: 'ProductCollectionTab',
    components: {
        VerticalCenteredView,
        VerticalFixedScroll,
        ResponsiveCenteredViewTemplate,
        ExpandingCollection,
        ProductCollectionItem,
    },
    asyncData({ params, $axios, store }) {
        return $axios.$get(`${store.state.authentication.user.language}/collections/product/${params.id}`).then(collection => collection);
    },
};
</script>

<style lang="scss" scoped>
    .collections {
        width: 1008px;
        padding: 24px;
    }

    .container {
        display: grid;
    }
</style>
