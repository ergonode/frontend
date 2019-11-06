/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :icon="icon"
            :is-read-only="$isReadOnly('CATEGORY_TREE')">
            <template #buttons>
                <PrependIconButton
                    title="CREATE TREE"
                    :size="smallSize"
                    :disabled="!$hasAccess('CATEGORY_TREE_CREATE')"
                    @click.native="addNewTree">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import { SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'GridCategoryTreesPage',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        PrependIconButton,
        IconAdd,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('CATEGORY_TREE_READ')) {
            this.tabs.push({
                title: 'Category trees',
                route: { name: 'category-trees-grid' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    methods: {
        addNewTree() {
            this.$router.push('/category-trees/tree/new');
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
