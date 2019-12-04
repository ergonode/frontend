/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="usersActivityLogsGrid"
                :edit-route="editRoute"
                :basic-filters="true"
                :edit-column="false"
                :select-column="false"
                title="Users activity logs" />
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
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'UsersActivityLogsGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('~/core/components/Grid/Grid'),
        GridPageSelector: () => import('~/core/components/Grid/GridPageSelector'),
        GridPagination: () => import('~/core/components/Grid/GridPagination'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('usersActivityLogsGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('usersActivityLogsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        editRoute() {
            return {
                path: `${this.userLanguageCode}/accounts/log`,
                name: 'users-logs-edit-id',
            };
        },
    },
    methods: {
        ...mapActions('usersActivityLogsGrid', [
            'getData',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        onRowsCountUpdate(value) {
            const number = Math.trunc(value);

            if (number !== this.numberOfDisplayedElements) {
                this.changeNumberOfDisplayingElements({ number });
                this.getData(this.editRoute.path);
            }
        },
        onPageChanged(page) {
            this.setCurrentPage(page);
            this.getData(this.editRoute.path);
        },
    },
};
</script>
