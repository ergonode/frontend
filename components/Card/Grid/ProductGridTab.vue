/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #filters>
            <GridAdvancedFilters
                :filters-data="advancedFiltersData"
                :filters="advancedFilters"
                namespace="productsGrid"
                :path="editRoute.path"
                :disabled="isFilterExists"
                @focus="onAdvancedFilterFocus" />
        </template>
        <template #sidebar>
            <VerticalTabBar
                :items="verticalTabs"
                @select="onSelectTabBarItem" />
        </template>
        <template #grid>
            <Grid
                namespace="productsGrid"
                :edit-route="editRoute"
                :editing-privilege-allowed="isUserAllowedToUpdate"
                :advanced-filters="true"
                :basic-filters="true"
                :draggable-column="true"
                title="Products"
                @rowEdit="onRowEdit" />
        </template>
        <template #footer>
            <GridPageSelector
                :value="numberOfDisplayedElements"
                :rows-number="numberOfDataElements"
                @input="onRowsCountUpdate" />
            <GridPagination
                :value="currentPage"
                :max-page="numberOfPages"
                @input="onPageChanged" />
            <Button
                title="SAVE CHANGES"
                :loaded="$isLoaded('footerDraftButton')"
                :disabled="!isUserAllowedToUpdate"
                @click.native="saveDrafts" />
        </template>
    </GridViewTemplate>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import VerticalTabBar from '~/core/components/Tab/VerticalTabBar';
import Button from '~/core/components/Buttons/Button';
import GridViewTemplate from '~/core/components/Layout/Templates/GridViewTemplate';

export default {
    name: 'ProductGridTab',
    components: {
        GridViewTemplate,
        VerticalTabBar,
        Button,
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
        ...mapState('productsGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
            advancedFiltersData: (state) => state.advancedFiltersData,
            advancedFilters: (state) => state.advancedFilters,
        }),
        ...mapState('gridDraft', {
            drafts: (state) => state.drafts,
        }),
        ...mapGetters('productsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        verticalTabs() {
            return [
                {
                    title: 'Attributes',
                    component: () => import('~/components/Card/Lists/AttributesListTab'),
                    props: {
                        disabled: !this.$hasAccess(['PRODUCT_READ']),
                    },
                    iconPath: 'Menu/IconAttributes',
                    listDataType: 'attributes',
                },
                {
                    title: 'System Attributes',
                    component: () => import('~/components/Card/Lists/SystemAttributesListTab'),
                    props: {
                        disabled: !this.$hasAccess(['PRODUCT_READ']),
                    },
                    iconPath: 'Menu/IconSettings',
                    listDataType: 'attributes/system',
                },
            ];
        },
        isFilterExists() {
            const draggedElIndex = this.advancedFiltersData.findIndex(
                (filter) => filter.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
        editRoute() {
            return {
                path: `${this.userLanguageCode}/products`,
                name: 'product-edit-id',
            };
        },
    },
    methods: {
        ...mapActions('productsGrid', [
            'getData',
            'addDraftToProduct',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
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
        onRowsCountUpdate(value) {
            const number = Math.trunc(value);

            if (number !== this.numberOfDisplayedElements) {
                this.changeNumberOfDisplayingElements(number);
                this.getData(this.editRoute.path);
            }
        },
        onAdvancedFilterFocus(isFocused) {
            // TODO: Solve it
            this.isAdvancedFilterFocused = isFocused;
        },
        onRowEdit({ links: { edit } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'product-edit-id-general', params: { id: args[lastIndex] } });
        },
        onPageChanged(page) {
            this.setCurrentPage(page);
            this.getData(this.editRoute.path);
        },
        saveDrafts() {
            const promises = [];

            Object.keys(this.drafts).forEach((productId) => {
                promises.push(this.applyDraft({
                    id: productId,
                    onSuccess: () => {
                        Object.entries(this.drafts[productId])
                            .forEach(([columnId, languageCode]) => {
                                const [value] = Object.values(languageCode);

                                this.addDraftToProduct({ columnId, productId, value });
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
