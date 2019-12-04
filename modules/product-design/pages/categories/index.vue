/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Categories"
            :is-read-only="$isReadOnly('CATEGORY')">
            <template #mainAction>
                <PrependIconButton
                    title="NEW CATEGORY"
                    :size="smallSize"
                    :disabled="!$hasAccess(['CATEGORY_CREATE'])"
                    @click.native="addCategory">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <CategoryGridTab />
    </Page>
</template>
<script>
import { SIZES } from '~/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import CategoryGridTab from '~/components/Card/Grid/CategoryGridTab';

export default {
    name: 'Categories',
    components: {
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        PrependIconButton,
        IconAdd,
        CategoryGridTab,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'categoryGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('categoryGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addCategory() {
            this.$router.push('/categories/category/new/general');
        },
    },
    async fetch({ app, store }) {
        const gridPath = `${store.state.authentication.user.language}/categories`;

        app.$registerStore({
            module: gridModule,
            moduleName: 'categoryGrid',
            store,
        });
        await store.dispatch('categoryGrid/getData', gridPath);
    },
};
</script>
