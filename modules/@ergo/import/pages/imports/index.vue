/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Import profiles"
            :is-read-only="$isReadOnly('IMPORT')">
            <template #mainAction>
                <Button
                    title="NEW IMPORT PROFILE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['IMPORT_CREATE'])"
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
        <CreateImportProfileModalForm
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
    name: 'Imports',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        CreateImportProfileModalForm: () => import('@Import/components/Modals/CreateImportProfileModalForm'),
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
            title: 'Import profiles - Ergonode',
        };
    },
};
</script>
