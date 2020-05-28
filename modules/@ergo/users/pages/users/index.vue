/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Users"
            :is-read-only="$isReadOnly('USER')">
            <template #mainAction>
                <Button
                    title="NEW USER"
                    :size="smallSize"
                    :disabled="!$hasAccess(['USER_CREATE'])"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar :items="tabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <CreateUserModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @create="onCreatedData" />
    </Page>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'UsersTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalRoutingTabBar: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBar'),
        CreateUserModalForm: () => import('@Users/components/Modals/CreateUserModalForm'),
        Button,
        IconAdd,
    },
    mixins: [gridModalMixin],
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    head() {
        return {
            title: 'Users - Ergonode',
        };
    },
};
</script>
