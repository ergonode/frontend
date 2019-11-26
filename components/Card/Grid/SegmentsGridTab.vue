/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="segmentsGrid"
                :route-edit="routeEdit"
                :editing-privilege-allowed="$hasAccess(['SEGMENT_UPDATE'])"
                :basic-filters="true"
                :select-column="false"
                title="Segments"
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
    name: 'SegmentsGridTab',
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
            moduleName: 'segmentsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('segmentsGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('segmentsGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('segmentsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        routeEdit() {
            return {
                getData: `${this.userLanguageCode}/segments`,
                name: 'segment-edit-id',
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
        ...mapActions('segmentsGrid', [
            'getData',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        onRowEdit({ links: { edit } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'segment-edit-id-general', params: { id: args[lastIndex] } });
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
        const gridPath = `${store.state.authentication.user.language}/segments`;

        app.$registerStore({
            module: gridModule,
            moduleName: 'segmentsGrid',
            store,
        });
        await store.dispatch('segmentsGrid/getData', { path: gridPath });
    },
};
</script>
