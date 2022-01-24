/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :scope="scope"
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :drafts="drafts"
        :errors="errors"
        :sort-order="sortOrder"
        :filters="filterValues"
        :pagination="pagination"
        :extended-components="extendedGridComponents"
        :collection-cell-binding="collectionCellBinding"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-border="true"
        :is-header-visible="true"
        @edit-row="onEditRow"
        @preview-row="onEditRow"
        @delete-row="onRemoveRow"
        @cell-value="onCellValueChange"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters"
        v-bind="extendedProps['grid']">
        <template #actionsHeader="actionsHeaderProps">
            <Component
                v-for="(headerItem, index) in extendedActionHeader"
                :is="headerItem.component"
                :key="index"
                v-bind="bindingProps({
                    props: {
                        ...actionsHeaderProps,
                        ...headerItem.props,
                    },
                })" />
            <AddProductsToCollectionButton @added="onAddedProducts" />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <UpdateCollectionProductsVisibilityButton
                :scope="scope"
                :errors="errors"
                :drafts="drafts"
                :change-values="changeValues"
                @updated="onCollectionProductsVisibilityUpdated" />
        </template>
    </Grid>
</template>

<script>
import AddProductsToCollectionButton from '@Collections/components/Buttons/AddProductsToCollectionButton';
import UpdateCollectionProductsVisibilityButton
    from '@Collections/components/Buttons/UpdateCollectionProductsVisibilityButton';
import PRIVILEGES from '@Collections/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_PAGE,
} from '@Core/defaults/grid';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getDefaultDataFromQueryParams,
    getDraftsBasedOnCellValues,
    getFilterQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CollectionProductsGrid',
    components: {
        AddProductsToCollectionButton,
        UpdateCollectionProductsVisibilityButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Collections/components/Grids/CollectionProductsGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
    },
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        const {
            filterValues,
            pagination,
            sortOrder,
        } = getDefaultDataFromQueryParams(this.$route);

        return {
            filterValues,
            pagination,
            sortOrder,
            rows: [],
            columns: [],
            filtered: 0,
            isPrefetchingData: true,
        };
    },
    computed: {
        extendedActionHeader() {
            return this.$getExtendSlot('@Collections/components/Grids/CollectionProductsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Collections/components/Grids/CollectionProductsGrid/footer');
        },
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
    },
    watch: {
        async $route(to, from) {
            if (from.name !== to.name || from.query.layout !== to.query.layout) {
                return;
            }

            const {
                filterValues,
                pagination,
                sortOrder,
            } = getDefaultDataFromQueryParams(this.$route);

            this.filterValues = filterValues;
            this.pagination = pagination;
            this.sortOrder = sortOrder;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onCollectionProductsVisibilityUpdated() {
            Object.keys(this.drafts).forEach((key) => {
                const [
                    rowId,
                ] = key.split('/');

                const row = this.rows.find(({
                    id,
                }) => id.value === rowId);

                if (row) {
                    row.visible.value = this.drafts[key];
                }
            });

            this.setDrafts();
        },
        onCellValueChange(cellValues) {
            this.setDrafts({
                ...this.drafts,
                ...getDraftsBasedOnCellValues(cellValues),
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'collectionProducts',
                value: this.drafts,
            });
        },
        onAddedProducts() {
            this.onFetchData();
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Collections.collection.components.CollectionProductsGrid.successMessage'),
            });
            this.onFetchData();
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                params: {
                    id: args[lastIndex],
                },
            });
        },
        async onFetchData() {
            await getGridData({
                $cookies: this.$gridCookies,
                $axios: this.$axios,
                path: `collections/${this.$route.params.id}/elements`,
                params: getParams({
                    $route: this.$route,
                    $cookies: this.$gridCookies,
                }),
                onSuccess: this.onFetchDataSuccess,
                onError: this.onFetchDataError,
            });
        },
        onFetchDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns;
            this.rows = rows;
            this.filtered = filtered;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Collections.collection.components.CollectionProductsGrid.errorMessage'),
            });
        },
        onRemoveAllFilters() {
            const query = {
                ...this.$route.query,
                page: DEFAULT_PAGE,
            };

            delete query.filter;

            this.$router.replace({
                query,
            });

            this.isPrefetchingData = true;
        },
        onFilterChange(filters) {
            const query = {
                ...this.$route.query,
                page: DEFAULT_PAGE,
                filter: getParsedFilters(filters),
            };

            if (query.filter === '' || query.filter === null) {
                delete query.filter;
            }

            this.$router.replace({
                query,
            });
        },
        onColumnSortChange(sortOrder) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ...sortOrder,
                },
            });
        },
        onPaginationChange(pagination) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ...pagination,
                },
            });
        },
        bindingProps({
            props = {},
        }) {
            const query = getFilterQueryParams(this.$route.query);

            return {
                disabled: !this.isAllowedToUpdate,
                query: query.replace(/\[|\]/g, ''),
                ...props,
            };
        },
    },
};
</script>
