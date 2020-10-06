/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Templates"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    data-cy="new-template"
                    title="NEW TEMPLATE"
                    :size="smallSize"
                    :disabled="!isAllowedToCreate"
                    @click.native="onCreate">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <CenterViewTemplate>
            <template #content>
                <Grid
                    :is-editable="isAllowedToUpdate"
                    :columns="columns"
                    :data-count="filtered"
                    :rows="rows"
                    :placeholder="noRecordsPlaceholder"
                    :is-prefetching-data="isPrefetchingData"
                    :default-layout="gridLayout.COLLECTION"
                    :is-collection-layout="true"
                    :is-header-visible="true"
                    :is-basic-filter="true"
                    :is-border="true"
                    :collection-cell-binding="collectionCellBinding"
                    @editRow="onEditRow"
                    @previewRow="onEditRow"
                    @deleteRow="onRemoveRow"
                    @fetch-data="onFetchData" />
            </template>
        </CenterViewTemplate>
        <CreateProductTemplateModalForm
            v-if="isCreateProductTemplateVisible"
            @close="onCloseModal"
            @created="onCreatedProductTemplate" />
    </Page>
</template>

<script>
import {
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Page from '@Core/components/Layout/Page';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import PRIVILEGES from '@Templates/config/privileges';

export default {
    name: 'Templates',
    components: {
        CenterViewTemplate,
        TitleBar,
        Page,
        IconAdd,
        Button,
        CreateProductTemplateModalForm: () => import('@Templates/components/Modals/CreateProductTemplateModalForm'),
    },
    mixins: [
        fetchGridDataMixin({
            path: 'templates',
        }),
        beforeLeavePageMixin,
    ],
    async fetch() {
        await this.onFetchData();
        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
            isCreateProductTemplateVisible: false,
        };
    },
    computed: {
        noRecordsPlaceholder() {
            return {
                title: 'No product templates',
                subtitle: 'There are no product templates in the system, you can create the first one.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.create,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.TEMPLATE_DESIGNER.namespace);
        },
        collectionCellBinding() {
            return {
                imageColumn: 'image_id',
                descriptionColumn: 'name',
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
        gridLayout() {
            return GRID_LAYOUT;
        },
    },
    methods: {
        onCreate() {
            this.isCreateProductTemplateVisible = true;
        },
        onCloseModal() {
            this.isCreateProductTemplateVisible = false;
        },
        onCreatedProductTemplate() {
            this.isCreateProductTemplateVisible = false;
            this.onFetchData(this.localParams);
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'product-template-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
    head() {
        return {
            title: 'Product templates - Ergonode',
        };
    },
};
</script>
