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
                <NavigationBackFab />
            </template>
            <template #mainAction>
                <RemoveImportButton />
                <Button
                    title="IMPORT NOW"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    :disabled="!isAllowedToUpdate"
                    @click.native="onShowModal" />
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
        <UploadImportFileModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>

<script>
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import RemoveImportButton from '@Import/components/Buttons/RemoveImportButton';
import PRIVILEGES from '@Import/config/privileges';

export default {
    name: 'ImportProfilePage',
    components: {
        RemoveImportButton,
        UploadImportFileModalForm: () => import('@Import/components/Modals/UploadImportFileModalForm'),
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
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.IMPORT.update,
            ]);
        },
    },
};
</script>
