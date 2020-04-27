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
                <Button
                    title="NEW TREE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['CATEGORY_TREE_CREATE'])"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs">
            <template #item>
                <HorizontalTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalTabBar>
        <CreateCategoryTreeModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @create="onCreatedData" />
    </Page>
</template>

<script>
import { SIZE } from '@Core/defaults/theme';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'CategoryTrees',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        HorizontalTabBarContent: () => import('@Core/components/Tab/HorizontalTabBarContent'),
        CreateCategoryTreeModalForm: () => import('@Trees/components/Modals/CreateCategoryTreeModalForm'),
        Button,
        IconAdd,
    },
    mixins: [gridModalMixin],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    head() {
        return {
            title: 'Category trees - Ergonode',
        };
    },
};
</script>
