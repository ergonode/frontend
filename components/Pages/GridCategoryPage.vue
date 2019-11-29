/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :icon="icon"
            :is-read-only="$isReadOnly('CATEGORY')">
            <template #mainAction>
                <PrependIconButton
                    title="NEW CATEGORY"
                    :size="smallSize"
                    :disabled="!$hasAccess(['CATEGORY_CREATE'])"
                    @click.native="addCategory">
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
    name: 'GridCategoryPage',
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
        if (this.$hasAccess(['CATEGORY_READ'])) {
            this.tabs.push({
                title: 'Categories',
                route: { name: 'categories-grid' },
            });
        }
    },
    methods: {
        addCategory() {
            this.$router.push('/categories/category/new');
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
