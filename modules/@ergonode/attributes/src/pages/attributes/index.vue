/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('attribute.page.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    data-cy="new-attribute"
                    :title="$t('attribute.page.addButton')"
                    :size="smallSize"
                    :disabled="!isAllowedToCreate"
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
        <CreateAttributeModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalRoutingTabBar: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBar'),
        CreateAttributeModalForm: () => import('@Attributes/components/Modals/CreateAttributeModalForm'),
        Button,
        IconAdd,
    },
    mixins: [
        gridModalMixin,
    ],
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.create,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(
                PRIVILEGES.ATTRIBUTE.namespace,
            );
        },
        smallSize() {
            return SIZE.SMALL;
        },
        tabs() {
            return getNestedTabRoutes({
                hasAccess: this.$hasAccess,
                routes: this.$router.options.routes,
                route: this.$route,
            });
        },
    },
    head() {
        return {
            title: this.$t('attribute.page.head'),
        };
    },
};
</script>
