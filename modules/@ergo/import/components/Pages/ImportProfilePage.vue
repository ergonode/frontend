/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('IMPORT')">
            <template #mainAction>
                <Button
                    title="IMPORT NOW"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    :disabled="!$hasAccess(['IMPORT_UPDATE'])"
                    @click.native="onShowModal" />
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                title="SAVE IMPORT PROFILE"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
        <UploadImportFileModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @create="onCreatedData" />
    </Page>
</template>

<script>
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'ImportProfilePage',
    components: {
        UploadImportFileModalForm: () => import('@Import/components/Modals/UploadImportFileModalForm'),
    },
    mixins: [categoryManagementPageMixin, gridModalMixin],
};
</script>
