/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="importGrid"
                :edit-route="editRoute"
                :editing-privilege-allowed="$hasAccess(['IMPORT_UPDATE'])"
                :basic-filters="true"
                :select-column="false"
                :is-column-editable="false"
                title="Imports"
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
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridModule from '@Core/reusableStore/grid/state';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ImportGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
        GridPageSelector: () => import('@Core/components/Grid/GridPageSelector'),
        GridPagination: () => import('@Core/components/Grid/GridPagination'),
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'importGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('importGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('importGrid', {
            numberOfDataElements: (state) => state.filtered,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('importGrid', {
            numberOfPages: 'numberOfPages',
        }),
        editRoute() {
            return {
                path: `${this.userLanguageCode}/imports`,
                name: 'import-edit-id',
            };
        },
    },
    methods: {
        ...mapActions('importGrid', [
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
        onRowEdit({ links: { value: { edit } } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'import-edit-id-general', params: { id: args[lastIndex] } });
        },
        onPageChanged(page) {
            this.setCurrentPage(page);
            this.getData(this.editRoute.path);
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'importGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/imports`;
        await store.dispatch('importGrid/getData', gridPath);
    },
};
</script>
