/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :icon="icon"
            :is-read-only="$isReadOnly('CATEGORY_TREE')">
            <template #mainAction>
                <PrependIconButton
                    title="NEW TREE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['CATEGORY_TREE_CREATE'])"
                    @click.native="addTree">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar
            :items="tabs" />
    </Page>
</template>

<script>
import { SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'GridCategoryTreesPage',
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
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
        if (this.$hasAccess(['CATEGORY_TREE_READ'])) {
            this.tabs.push({
                title: 'Category trees',
                route: { name: 'category-trees-grid' },
            });
        }
    },
    methods: {
        addTree() {
            this.$router.push('/category-trees/tree/new');
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
