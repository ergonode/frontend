/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Import profiles"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    title="NEW IMPORT PROFILE"
                    :size="smallSize"
                    :disabled="!isAllowedToCreate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <CreateImportProfileModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import PRIVILEGES from '@Import/config/privileges';

export default {
    name: 'Imports',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
        CreateImportProfileModalForm: () => import('@Import/components/Modals/CreateImportProfileModalForm'),
    },
    mixins: [
        gridModalMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.IMPORT.namespace);
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.IMPORT.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    head() {
        return {
            title: 'Import profiles - Ergonode',
        };
    },
};
</script>
