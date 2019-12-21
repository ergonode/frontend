/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="userActivityLogsGrid"
                :edit-route="editRoute"
                :basic-filters="true"
                :edit-column="false"
                :select-column="false"
                :is-column-editable="false"
                title="Activity logs" />
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
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'UserActivityLogsGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
        GridPageSelector: () => import('@Core/components/Grid/GridPageSelector'),
        GridPagination: () => import('@Core/components/Grid/GridPagination'),
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'userActivityLogsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('userActivityLogsGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('userActivityLogsGrid', {
            numberOfDataElements: (state) => state.filtered,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('userActivityLogsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        editRoute() {
            return {
                path: '/profile/log',
                name: 'users-logs-edit-id',
            };
        },
    },
    methods: {
        ...mapActions('userActivityLogsGrid', [
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
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'userActivityLogsGrid',
            store,
        });
        const gridPath = '/profile/log';
        await store.dispatch('userActivityLogsGrid/getData', gridPath);
    },
};
</script>
