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
                    :columns="columns"
                    :data-count="filtered"
                    :rows="rows"
                    :filters="filterValues"
                    :placeholder="noDataPlaceholder"
                    :default-layout="gridLayout.COLLECTION"
                    :extended-columns="extendedColumns"
                    :extended-data-cells="extendedDataCells"
                    :extended-data-filter-cells="extendedDataFilterCells"
                    :extended-data-edit-cells="extendedDataEditCells"
                    :extended-edit-filter-cells="extendedDataEditFilterCells"
                    :is-editable="isAllowedToUpdate"
                    :is-collection-layout="true"
                    :is-header-visible="true"
                    :is-basic-filter="true"
                    :is-border="true"
                    :is-prefetching-data="isPrefetchingData"
                    :collection-cell-binding="collectionCellBinding"
                    @edit-row="onEditRow"
                    @preview-row="onEditRow"
                    @delete-row="onRemoveRow"
                    @fetch-data="onFetchData"
                    @remove-all-filters="onRemoveAllFilters"
                    @filter="onFilterChange" />
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
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import PRIVILEGES from '@Templates/config/privileges';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import Page from '@UI/components/Layout/Page';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import TitleBar from '@UI/components/TitleBar/TitleBar';

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
        extendedGridComponentsMixin,
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
        noDataPlaceholder() {
            return {
                title: 'No product templates',
                subtitle: 'There are no product templates in the system, you can create the first one.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
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
