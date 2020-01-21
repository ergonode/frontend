/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #filters>
            <GridAdvancedFilters
                :filters="advancedFilters"
                @insertFilter="insertFilterAtIndex"
                @setGhostFilter="setGhostFilterAtIndex"
                @removeFilter="removeFilterAtIndex"
                @updateFilter="updateFilterValueAtIndex"
                @clearFilter="clearFilterAtIndex"
                @applyFilter="applyFilter"
                @swapFilters="swapFiltersPosition"
                @removeAllFilters="removeAllFilters"
                @clearAllFilters="clearAllFilters"
                @dropFilter="dropFilterAtIndex" />
        </template>
        <template #sidebar>
            <VerticalTabBar
                :items="verticalTabs"
                @select="onSelectTabBarItem" />
        </template>
        <template #grid>
            <Grid
                title="Products"
                :editing-privilege-allowed="isUserAllowedToUpdate"
                :columns="columns"
                :basic-filters="basicFilters"
                :advanced-filters="advancedFilters"
                :sorted-column="sortedColumn"
                :max-rows="filtered"
                :max-page="numberOfPages"
                :current-page="currentPage"
                :cell-values="cellValues"
                :row-ids="rowIds"
                :row-links="rowLinks"
                :is-basic-filters="true"
                :is-draggable="true"
                :is-edit-column="true"
                :is-select-column="true"
                @editRow="onEditRow"
                @sortColumn="setSortedColumn"
                @filterColumn="setBasicFilter"
                @swapColumns="swapColumnsPosition"
                @insertColumn="insertColumnAtIndex"
                @removeColumn="removeColumnAtIndex"
                @dropColumn="dropColumnAtIndex" />
        </template>
        <template #footer>
            <GridPageSelector
                :value="maxRowsPerPage"
                :max-rows="filtered"
                @input="setMaxRowsPerPage" />
            <GridPagination
                :value="currentPage"
                :max-page="numberOfPages"
                @input="setCurrentPage" />
            <Button
                title="SAVE CHANGES"
                :loaded="$isLoaded('footerDraftButton')"
                :disabled="!isUserAllowedToUpdate"
                @click.native="saveDrafts" />
        </template>
    </GridViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Button from '~/core/components/Buttons/Button';
import GridViewTemplate from '~/core/components/Layout/Templates/GridViewTemplate';
import gridDataMixin from '~/mixins/grid/gridDataMixin';

export default {
    name: 'ProductGridTab',
    mixins: [gridDataMixin({ path: 'products' })],
    components: {
        GridViewTemplate,
        Button,
        VerticalTabBar: () => import('~/core/components/Tab/VerticalTabBar'),
        Grid: () => import('~/core/components/Grid/Grid'),
        GridAdvancedFilters: () => import('~/core/components/Grid/AdvancedFilters/GridAdvancedFilters'),
        GridPagination: () => import('~/core/components/Grid/GridPagination'),
        GridPageSelector: () => import('~/core/components/Grid/GridPageSelector'),
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElement: (state) => state.draggedElement,
        }),
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('gridDraft', {
            drafts: (state) => state.drafts,
        }),
        verticalTabs() {
            const isUserAllowedToReadProduct = this.$hasAccess(['PRODUCT_READ']);

            return [
                {
                    title: 'Attributes',
                    component: () => import('~/components/Card/Lists/AttributesListTab'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                    iconPath: 'Menu/IconAttributes',
                    listDataType: 'attributes',
                },
                {
                    title: 'System Attributes',
                    component: () => import('~/components/Card/Lists/SystemAttributesListTab'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                    iconPath: 'Menu/IconSettings',
                    listDataType: 'attributes/system',
                },
            ];
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'applyDraft',
        ]),
        ...mapActions('list', [
            'getElements',
        ]),
        ...mapActions('gridDraft', [
            'removeDraft',
            'forceDraftsMutation',
        ]),
        onSelectTabBarItem(index) {
            const { listDataType } = this.verticalTabs[index];

            this.getElements({
                listType: listDataType,
                languageCode: this.userLanguageCode,
            });
        },
        onEditRow({ links: { value: { edit } } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'product-edit-id-general', params: { id: args[lastIndex] } });
        },
        saveDrafts() {
            const promises = [];

            Object.keys(this.drafts).forEach((productId) => {
                promises.push(this.applyDraft({
                    id: productId,
                    onSuccess: () => {
                        Object.keys(this.drafts[productId]).forEach((columnId) => {
                            this.cellValues[productId][columnId] = this.drafts[productId][columnId];
                            this.removeDraft(productId);
                        });
                    },
                }));
            });

            Promise.all(promises).then(() => {
                this.forceDraftsMutation();
                this.$addAlert({ type: 'success', message: 'Product changes saved' });
            });
        },
    },
};
</script>
