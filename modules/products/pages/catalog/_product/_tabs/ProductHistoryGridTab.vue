/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="productHistoryGrid"
                :edit-route="editRoute"
                :basic-filters="true"
                :edit-column="false"
                :select-column="false"
                title="Product history" />
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
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ProductHistoryGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('~/core/components/Grid/Grid'),
        GridPageSelector: () => import('~/core/components/Grid/GridPageSelector'),
        GridPagination: () => import('~/core/components/Grid/GridPagination'),
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
        editRoute() {
            const { params: { id } } = this.$route;

            return {
                path: `${this.userLanguageCode}/products/${id}/history`,
                name: '',
            };
        },
    },
    methods: {
        ...mapActions('productHistoryGrid', [
            'getData',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        onRowsCountUpdate(value) {
            const number = Math.trunc(value);

            if (number !== this.numberOfDisplayedElements) {
                this.changeNumberOfDisplayingElements(number);
                this.getData(this.editRoute.path);
            }
        },
        onPageChanged(page) {
            this.setCurrentPage(page);
            this.getData(this.editRoute.path);
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

        await store.dispatch('productHistoryGrid/getData', gridPath);
    },
};
</script>
