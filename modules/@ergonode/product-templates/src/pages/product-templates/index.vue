/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Templates"
            :is-read-only="$isReadOnly('TEMPLATE_DESIGNER')">
            <template #mainAction>
                <Button
                    data-cy="new-template"
                    title="NEW TEMPLATE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['TEMPLATE_DESIGNER_CREATE'])"
                    @click.native="onCreate">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <ResponsiveCenteredViewTemplate>
            <template #content>
                <Grid
                    :is-editable="$hasAccess(['TEMPLATE_DESIGNER_UPDATE'])"
                    :columns="columns"
                    :data-count="filtered"
                    :rows="rows"
                    :is-prefetching-data="isPrefetchingData"
                    :default-layout="gridLayout.COLLECTION"
                    :is-collection-layout="true"
                    :is-header-visible="true"
                    :is-basic-filter="true"
                    :is-centered-view="true"
                    :collection-cell-binding="collectionCellBinding"
                    @editRow="onEditRow"
                    @deleteRow="onRemoveRow"
                    @fetchData="getGridData" />
            </template>
        </ResponsiveCenteredViewTemplate>
        <CreateProductTemplateModalForm
            v-if="isCreateProductTemplateVisible"
            @close="onCloseModal"
            @create="onCreatedProductTemplate" />
    </Page>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

export default {
    name: 'Templates',
    components: {
        ResponsiveCenteredViewTemplate,
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
        Button: () => import('@Core/components/Buttons/Button'),
        CreateProductTemplateModalForm: () => import('@Templates/components/Modals/CreateProductTemplateModalForm'),
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    mixins: [
        fetchGridDataMixin({
            path: 'templates',
        }),
    ],
    data() {
        return {
            isCreateProductTemplateVisible: false,
        };
    },
    computed: {
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
            this.getGridData(this.localParams);
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
