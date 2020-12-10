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
                <CreateProductTemplateButton @created="onCreatedData" />
            </template>
        </TitleBar>
        <CenterViewTemplate>
            <template #content>
                <Grid
                    :columns="columns"
                    :data-count="filtered"
                    :rows="rows"
                    :filters="filterValues"
                    :pagination="pagination"
                    :placeholder="noDataPlaceholder"
                    :default-layout="gridLayout.COLLECTION"
                    :extended-components="extendedGridComponents"
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
                    @pagination="onPaginationChange"
                    @sort-column="onColumnSortChange"
                    @remove-all-filters="onRemoveAllFilters"
                    @filter="onFilterChange" />
            </template>
        </CenterViewTemplate>
    </Page>
</template>

<script>
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import CreateProductTemplateButton from '@Templates/components/Buttons/CreateProductTemplateButton';
import PRIVILEGES from '@Templates/config/privileges';
import {
    ROUTE_NAME,
} from '@Templates/config/routes';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Page from '@UI/components/Layout/Page';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'Templates',
    components: {
        CreateProductTemplateButton,
        CenterViewTemplate,
        TitleBar,
        Page,
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
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.TEMPLATE_DESIGNER.namespace);
        },
        collectionCellBinding() {
            return {
                imageColumn: 'image_id',
                descriptionColumn: 'name',
            };
        },
        gridLayout() {
            return GRID_LAYOUT;
        },
    },
    methods: {
        onCreatedData() {
            this.onFetchData();
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_GENERAL,
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
