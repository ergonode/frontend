/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="categoryTreesGrid"
                :edit-route="editRoute"
                :editing-privilege-allowed="$hasAccess(['CATEGORY_TREE_UPDATE'])"
                :basic-filters="true"
                :select-column="false"
                title="Category trees"
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
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'CategoryTreesGridTab',
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
        ...mapState('categoryTreesGrid', {
            numberOfDataElements: (state) => state.filtered,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('categoryTreesGrid', {
            numberOfPages: 'numberOfPages',
        }),
        editRoute() {
            return {
                path: `${this.userLanguageCode}/trees`,
                name: 'category-tree-edit-id-general',
            };
        },
    },
    methods: {
        ...mapActions('categoryTreesGrid', [
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
        onRowEdit({ links: { edit } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'category-tree-edit-id-general', params: { id: args[lastIndex] } });
        },
        onPageChanged(page) {
            this.setCurrentPage(page);
            this.getData(this.editRoute.path);
        },
    },
};
</script>
