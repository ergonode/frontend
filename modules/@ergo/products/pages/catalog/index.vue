/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Catalog"
            :is-read-only="$isReadOnly('PRODUCT')">
            <template #mainAction>
                <Button
                    title="NEW PRODUCT"
                    :size="smallSize"
                    :disabled="!$hasAccess(['PRODUCT_CREATE'])"
                    @click.native="addProduct">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <TrashCan v-show="draggedElementOnGrid" />
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { SIZES } from '@Core/defaults/buttons';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    name: 'Products',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        TrashCan: () => import('@Core/components/DragAndDrop/TrashCan'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        Button,
        IconAdd,
    },
    async fetch({ store }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await Promise.all([
            store.dispatch('list/clearStorage'),
            store.dispatch('list/getGroups', {
                listType: 'attributes',
                languageCode: userLanguageCode,
            }),
            store.dispatch('list/getElementsForGroup', {
                listType: 'attributes',
                groupId: null,
                languageCode: userLanguageCode,
            }),
        ]);
    },
    computed: {
        ...mapState('draggable', {
            draggedElementOnGrid: state => state.draggedElementOnGrid,
        }),
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addProduct() {
            this.$router.push({ path: '/catalog/product/new/general' });
        },
    },
};
</script>
