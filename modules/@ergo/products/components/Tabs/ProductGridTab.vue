/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs" />
        </template>
        <template #grid>
            <Grid
                :is-editable="isUserAllowedToUpdate"
                :columns="columns"
                :data="data"
                :advanced-filters="advancedFilters"
                :data-count="filtered"
                :collection-cell-binding="{
                    imageColumn: 'image_attribute:en',
                    descriptionColumn: 'sku'
                }"
                :is-advanced-filters="true"
                :is-header-visible="true"
                :is-basic-filter="true"
                @editRow="onEditRow"
                @editCell="onEditCell"
                @editCells="onEditCells"
                @removeRow="onRemoveRow"
                @dropColumn="onDropColumn"
                @insertFilter="insertFilterAtIndex"
                @setGhostFilter="setGhostFilterAtIndex"
                @removeFilter="removeFilterAtIndex"
                @updateFilter="updateFilterValueAtIndex"
                @clearFilter="clearFilterAtIndex"
                @swapFilters="swapFiltersPosition"
                @removeAllFilters="removeAllFilters"
                @clearAllFilters="clearAllFilters"
                @dropFilter="dropFilterAtIndex"
                @fetchData="getGridData">
                <template #appendFooter>
                    <Button
                        title="SAVE CHANGES"
                        :size="smallSize"
                        :disabled="!isUserAllowedToUpdate || $isLoading('footerDraftButton')"
                        @click.native="saveDrafts" />
                </template>
            </Grid>
        </template>
    </GridViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SIZE } from '@Core/defaults/theme';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import Button from '@Core/components/Buttons/Button';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';

const updateProductDraft = () => import('@Products/services/updateProductDraft.service');

export default {
    name: 'ProductGridTab',
    components: {
        GridViewTemplate,
        Button,
        VerticalTabBar: () => import('@Core/components/Tab/VerticalTabBar'),
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    mixins: [fetchGridDataMixin({ path: 'products' })],
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
        verticalTabs() {
            const isUserAllowedToReadProduct = this.$hasAccess(['PRODUCT_READ']);
            return [
                {
                    title: 'Product attributes',
                    component: () => import('@Attributes/components/Tabs/List/AttributesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconAttributes'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                },
                {
                    title: 'System attributes',
                    component: () => import('@Attributes/components/Tabs/List/SystemAttributesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconSettings'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                },
            ];
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
    },
    methods: {
        ...mapActions('product', [
            'applyDraft',
        ]),
        ...mapActions('grid', [
            'removeDraftRow',
        ]),
        onEditCell({ rowId, columnId, value }) {
            const { element_id } = this.columns.find(column => column.id === columnId);
            const [, languageCode] = columnId.split(':');

            updateProductDraft().then(response => response.default({
                $axios: this.$axios,
                $store: this.$store,
                fieldKey: `${rowId}/${columnId}`,
                languageCode,
                productId: rowId,
                elementId: element_id,
                value,
            }));
        },
        onEditCells(editedCells) {
            const requests = editedCells.map(({ rowId, columnId, value }) => {
                const { element_id } = this.columns.find(column => column.id === columnId);
                const [, languageCode] = columnId.split(':');

                return updateProductDraft().then(response => response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                    fieldKey: `${rowId}/${columnId}`,
                    languageCode,
                    productId: rowId,
                    elementId: element_id,
                    value,
                }));
            });

            Promise.all(requests);
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'product-id-general', params: { id: args[lastIndex] } });
        },
        saveDrafts() {
            const promises = [];

            Object.keys(this.drafts).forEach((rowId) => {
                promises.push(this.applyDraft({
                    id: rowId,
                    onSuccess: () => this.removeDraftRow(rowId),
                }));
            });

            Promise.all(promises).then(() => {
                this.getGridData(this.localParams);
                this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Product changes saved' });
            });
        },
    },
};
</script>
