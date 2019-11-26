/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                namespace="attributeGroupGrid"
                :route-edit="routeEdit"
                :editing-privilege-allowed="$hasAccess(['ATTRIBUTE_UPDATE'])"
                :basic-filters="true"
                :select-column="false"
                title="Attribute Groups"
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
    name: 'AttributeGroupGridTab',
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
            moduleName: 'attributeGroupGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('attributeGroupGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('attributeGroupGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('attributeGroupGrid', {
            numberOfPages: 'numberOfPages',
        }),
        routeEdit() {
            return {
                getData: `${this.userLanguageCode}/attributes/groups`,
                name: 'attribute-group-edit-id',
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
        ...mapActions('attributeGroupGrid', [
            'getData',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        onRowEdit({ links: { edit } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'attribute-group-edit-id-general', params: { id: args[lastIndex] } });
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
            moduleName: 'attributeGroupGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/attributes/groups`;
        await store.dispatch('attributeGroupGrid/getData', { path: gridPath });
    },
};
</script>
