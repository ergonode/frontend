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
                :path="routeEdit.getData"
                :disabled="isFilterExists"
                @focus="onAdvancedFilterFocus" />
        </template>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs" />
        </template>
        <template #grid>
            <Grid
                namespace="productsGrid"
                :route-edit="routeEdit"
                :editing-privilege-allowed="isUserAllowedToUpdate"
                :advanced-filters="true"
                :basic-filters="true"
                :draggable-column="true"
                title="Products"
                @rowEdit="onRowEdit" />
        </template>
        <template #footer>
            <GridPageSelector
                v-model="visibleRowsInPageCount"
                :rows-number="numberOfDataElements" />
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
import gridModule from '~/reusableStore/grid/state';
import VerticalTabBar from '~/components/Tab/VerticalTabBar';
import Button from '~/components/Buttons/Button';
import GridViewTemplate from '~/components/Layout/GridViewTemplate';

export default {
    name: 'ProductGridTab',
    components: {
        GridViewTemplate,
        VerticalTabBar,
        Button,
        Grid: () => import('~/components/Grid/Grid'),
        GridAdvancedFilters: () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilters'),
        GridPagination: () => import('~/components/Grid/GridPagination'),
        GridPageSelector: () => import('~/components/Grid/GridPageSelector'),
    },
    data() {
        return {
            verticalTabs: [
                {
                    title: 'Attributes',
                    component: () => import('~/components/Card/Lists/AttributesListTab'),
                    props: {
                        disabled: !this.$hasAccess('PRODUCT_READ'),
                    },
                    iconPath: 'Menu/IconAttributes',
                    active: true,
                },
            ],
        };
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'productsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('productsGrid');
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
        isFilterExists() {
            const draggedElIndex = this.advancedFiltersData.findIndex(
                (filter) => filter.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess('PRODUCT_UPDATE');
        },
        routeEdit() {
            return {
                getData: `${this.userLanguageCode}/products`,
                name: 'product-edit-id',
            };
        },
        visibleRowsInPageCount: {
            get() {
                return this.numberOfDisplayedElements;
            },
            set(value) {
                const number = Math.trunc(value);

                if (number !== this.numberOfDisplayedElements) {
                    this.changeNumberOfDisplayingElements({ number });
                    this.getDataWrapper();
                }
            },
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
        ...mapActions('gridDraft', [
            'removeDraft',
            'forceDraftsMutation',
        ]),
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
            this.getDataWrapper();
        },
        getDataWrapper() {
            const { getData: path } = this.routeEdit;
            this.getData(
                {
                    path,
                },
            );
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
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'productsGrid',
            store,
        });

        const gridPath = `${store.state.authentication.user.language}/products`;
        await store.dispatch('productsGrid/getData', { path: gridPath });
    },
};
</script>
