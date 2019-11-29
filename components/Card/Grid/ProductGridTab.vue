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
            <VerticalTabBar :items="verticalTabs" />
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
import VerticalTabBar from '~/core/components/Tab/VerticalTabBar';
import Button from '~/core/components/Buttons/Button';
import GridViewTemplate from '~/core/components/Layout/GridViewTemplate';

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
    data() {
        return {
            verticalTabs: [
                {
                    title: 'Attributes',
                    component: () => import('~/components/Card/Lists/AttributesListTab'),
                    props: {
                        disabled: !this.$hasAccess(['PRODUCT_READ']),
                    },
                    iconPath: 'Menu/IconAttributes',
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
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
        editRoute() {
            return {
                path: `${this.userLanguageCode}/products`,
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
                    this.changeNumberOfDisplayingElements(number);
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
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'productsGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/products`;

        await Promise.all([
            store.dispatch('productsGrid/getData', gridPath),
            store.dispatch('productsGrid/getAdvancedFiltersData', gridPath),
        ]).then(() => {
            const { columns, advancedFiltersData } = store.state.productsGrid;
            const disabledElements = {};
            const getAttributeElements = (array) => {
                const { length } = array;
                const elements = [];

                for (let i = 0; i < length; i += 1) {
                    const { language, element_id: elementId } = array[i];
                    if (elementId && language) {
                        if (!elements[language]) elements[language] = [];

                        elements[language].push(elementId);
                    }
                }

                return elements;
            };
            const columnElements = getAttributeElements(columns);
            const filterElements = getAttributeElements(advancedFiltersData);
            const languages = [...columnElements, ...filterElements];
            const languagesSet = new Set(languages);

            languagesSet.forEach((language) => {
                const ids = [...columnElements[language], ...filterElements[language]];
                const idsSet = new Set(ids);

                idsSet.forEach((id) => {
                    disabledElements[language] = {
                        ...disabledElements[language], [id]: true,
                    };
                });
            });

            store.dispatch('list/setDisabledElements', disabledElements);
        });
    },
};
</script>
