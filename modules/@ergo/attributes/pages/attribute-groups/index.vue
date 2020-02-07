/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Attribute groups"
            :is-read-only="$isReadOnly('ATTRIBUTE')">
            <template #mainAction>
                <Button
                    title="NEW ATTRIBUTE GROUP"
                    :size="smallSize"
                    :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                    @click.native="addAttributeGroup">
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
        <CreateAttributeGroupModalForm
            v-if="isCreateAttributeGroupVisible"
            @close="onCloseModal"
            @created="onCreatedAttributeGroup" />
    </Page>
</template>

<script>
import { THEMES, SIZES } from '@Core/defaults/buttons';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        HorizontalTabBarContent: () => import('@Core/components/Tab/HorizontalTabBarContent'),
        CreateAttributeGroupModalForm: () => import('@Attributes/components/Modals/CreateAttributeGroupModalForm'),
        Button,
        IconAdd,
    },
    data() {
        return {
            isCreateAttributeGroupVisible: false,
            fetchGridData: false,
        };
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    methods: {
        addAttributeGroup() {
            this.isCreateAttributeGroupVisible = true;
        },
        onCloseModal() {
            this.isCreateAttributeGroupVisible = false;
        },
        onCreatedAttributeGroup() {
            this.isCreateAttributeGroupVisible = false;
            this.fetchGridData = true;
        },
        onFetchedGridData() {
            this.fetchGridData = false;
        },
    },
};
</script>
