/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab />
            </template>
            <template #mainAction>
                <RemoveImportButton />
                <CreateImportButton @created="onCreatedData" />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors">
            <template
                #content="{
                    item,
                    errors: tabErrors,
                    changeValues: tabChangeValues,
                }">
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    :scope="item.scope"
                    :change-values="tabChangeValues"
                    :errors="tabErrors"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
    </Page>
</template>

<script>
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import CreateImportButton from '@Import/components/Buttons/CreateImportButton';
import RemoveImportButton from '@Import/components/Buttons/RemoveImportButton';
import PRIVILEGES from '@Import/config/privileges';

export default {
    name: 'ImportProfilePage',
    components: {
        CreateImportButton,
        RemoveImportButton,
    },
    mixins: [
        editPageMixin,
        asyncTabsMixin,
        gridModalMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.IMPORT.namespace);
        },
    },
};
</script>
