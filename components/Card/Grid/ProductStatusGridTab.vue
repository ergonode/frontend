/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="statusesGrid"
                :route-edit="routeEdit"
                :editing-privilege-allowed="$hasAccess('WORKFLOW_UPDATE')"
                :basic-filters="true"
                :select-row-column="false"
                title="Product statuses"
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
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';

export default {
    name: 'ProductStatusGridTab',
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
            moduleName: 'statusesGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('statusesGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('statusesGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('statusesGrid', {
            numberOfPages: 'numberOfPages',
        }),
        routeEdit() {
            return {
                getData: `${this.userLanguageCode}/status`,
                name: 'workflow-status-edit-id',
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
        ...mapActions('statusesGrid', [
            'getData',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        onRowEdit({ links: { edit } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'workflow-status-edit-id-general', params: { id: args[lastIndex] } });
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
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'statusesGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/status`;
        await store.dispatch('statusesGrid/getData', { path: gridPath });
    },
};
</script>
