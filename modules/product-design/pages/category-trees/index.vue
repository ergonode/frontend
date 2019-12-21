/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Category trees"
            :is-read-only="$isReadOnly('CATEGORY_TREE')">
            <template #mainAction>
                <PrependIconButton
                    title="NEW TREE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['CATEGORY_TREE_CREATE'])"
                    @click.native="addTree">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <CategoryTreesGridTab />
    </Page>
</template>

<script>
import { SIZES } from '@Core/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import PrependIconButton from '@Core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import CategoryTreesGridTab from '~/components/Card/Grid/CategoryTreesGridTab';

export default {
    name: 'CategoryTrees',
    components: {
        CategoryTreesGridTab,
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'categoryTreesGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('categoryTreesGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addTree() {
            this.$router.push({ name: 'category-tree-new' });
        },
    },
    async fetch({ app, store }) {
        const gridPath = `${store.state.authentication.user.language}/trees`;

        app.$registerStore({
            module: gridModule,
            moduleName: 'categoryTreesGrid',
            store,
        });
        await store.dispatch('categoryTreesGrid/getData', gridPath);
    },
};
</script>
