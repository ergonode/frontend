/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Attributes"
            :is-read-only="$isReadOnly('ATTRIBUTE')">
            <template #mainAction>
                <Button
                    title="NEW ATTRIBUTE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                    @click.native="addAttribute">
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
        <CreateAttributeModalForm
            v-if="isCreateAttributeVisible"
            @close="onCloseModal"
            @created="onCreatedAttribute" />
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
        CreateAttributeModalForm: () => import('@Attributes/components/Modals/CreateAttributeModalForm'),
        Button,
        IconAdd,
    },
    data() {
        return {
            isCreateAttributeVisible: false,
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
        addAttribute() {
            this.isCreateAttributeVisible = true;
        },
        onCloseModal() {
            this.isCreateAttributeVisible = false;
        },
        onCreatedAttribute() {
            this.isCreateAttributeVisible = false;
            this.fetchGridData = true;
        },
        onFetchedGridData() {
            this.fetchGridData = false;
        },
    },
};
</script>
