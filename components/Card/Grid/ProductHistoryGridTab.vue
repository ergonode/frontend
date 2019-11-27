/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="productHistoryGrid"
                :route-edit="routeEdit"
                :basic-filters="true"
                :edit-column="false"
                :select-column="false"
                title="Product history" />
        </template>
        <template #footer>
            <GridPageSelector
                v-model="visibleRowsInPageCount"
                :rows-number="numberOfDataElements" />
            <GridPagination
                :value="currentPage"
                :max-page="numberOfPages"
                @input="onPageChanged" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';

export default {
    name: 'ProductHistoryGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('~/components/Grid/Grid'),
        GridPageSelector: () => import('~/components/Grid/GridPageSelector'),
        GridPagination: () => import('~/components/Grid/GridPagination'),
    },
    data() {
        return {
            filtersNumber: 0,
            filtersExpanded: true,
        };
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'productHistoryGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('productHistoryGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('productHistoryGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('productHistoryGrid', {
            numberOfPages: 'numberOfPages',
        }),
        routeEdit() {
            const { params: { id } } = this.$route;
            return {
                getData: `${this.userLanguageCode}/products/${id}/history`,
                name: 'product-edit-id-history',
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
        ...mapActions('productHistoryGrid', [
            'getData',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        onPageChanged(page) {
            this.setCurrentPage(page);
            this.getDataWrapper();
        },
        getDataWrapper() {
            const { getData: path } = this.routeEdit;
            console.log(path);
            this.getData(
                {
                    path,
                },
            );
        },
    },
    async fetch({ app, store, params }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'productHistoryGrid',
            store,
        });
        const { id } = params;
        const gridPath = `${store.state.authentication.user.language}/products/${id}/history`;
        console.log(gridPath);

        await store.dispatch('productHistoryGrid/getData', { path: gridPath });
    },
};
</script>
