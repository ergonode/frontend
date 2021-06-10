/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :pagination="pagination"
        :filters="localParams.filters"
        :sort-order="localParams.sortOrder"
        :rows="rows"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-select-column="true"
        :is-basic-filter="true"
        :is-header-visible="true"
        @edit-row="onEditRow"
        @preview-row="onEditRow"
        @delete-row="onRemoveRow"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @remove-all-filters="onRemoveAllFilters"
        @filter="onFilterChange"
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
            <ExpandNumericButton
                :title="$t('@Products.product.components.AddProductRelationsGrid.filtersButtonTitle')"
                :number="advancedFilters.length"
                :is-expanded="isFiltersExpanded"
                @click.native="onFiltersExpand" />
        </template>
        <template #prependHeader>
            <AddFilterDropZone
                :filters="advancedFilters"
                @drop="onDropFilter" />
        </template>
        <template #appendHeader>
            <ProductAdvancedFilters
                v-show="isFiltersExpanded"
                :value="advancedFilterValues"
                :filters="advancedFilters"
                :extended-filters="extendedAdvancedFilters"
                @remove="onAdvancedFilterRemove"
                @remove-all="onAdvancedFilterRemoveAll"
                @input="onAdvancedFilterChange" />
        </template>
        <template #noDataPlaceholder>
            <ProductsGridNoDataPlaceholder v-if="!isAnyFilter && filtered === 0" />
        </template>
        <template
            #appendFooter="{
                selectedRows,
                excludedFromSelectionRows,
                selectedRowsCount,
                isSelectedAll,
                onClearSelectedRows,
            }">
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <AddProductRelationsButton
                :data-count="filtered"
                :filters="filters"
                :selected-rows="selectedRows"
                :excluded-from-selection-rows="excludedFromSelectionRows"
                :selected-rows-count="selectedRowsCount"
                :is-selected-all="isSelectedAll"
                :on-clear-selected-rows="onClearSelectedRows"
                @add="onAddProductRelations" />
        </template>
    </Grid>
</template>

<script>
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_PAGINATION,
    DEFAULT_POST_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getParsedFiltersList,
} from '@Core/models/mappers/gridDataMapper';
import {
    getDisabledElement,
} from '@Core/models/mappers/sideBarDataMapper';
import {
    getAdvancedFiltersData,
} from '@Core/services/grid/getGridData.service';
import {
    postGridData,
} from '@Core/services/grid/postGridData.service';
import ProductAdvancedFilters from '@Products/components/AdvancedFilters/ProductAdvancedFilters';
import AddProductRelationsButton from '@Products/components/Buttons/AddProductRelationsButton';
import ProductsGridNoDataPlaceholder from '@Products/components/Placeholders/ProductsGridNoDataPlaceholder';
import PRIVILEGES from '@Products/config/privileges';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import AddFilterDropZone from '@UI/components/Grid/DropZone/AddFilterDropZone';
import Grid from '@UI/components/Grid/Grid';
import GridNoDataPlaceholder from '@UI/components/Grid/GridNoDataPlaceholder';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import {
    debounce,
} from 'debounce';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AddProductRelationsGrid',
    components: {
        ProductAdvancedFilters,
        ProductsGridNoDataPlaceholder,
        AddFilterDropZone,
        ExpandNumericButton,
        AddProductRelationsButton,
        Grid,
        GridNoDataPlaceholder,
        IntersectionObserver,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/components/Grids/AddProductRelationsGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        extendedGridComponentsMixin,
    ],
    props: {
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
        },
        advancedFilterValues: {
            type: Object,
            default: () => ({}),
        },
        productId: {
            type: String,
            default: '',
        },
    },
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        return {
            searchValue: null,
            isPrefetchingData: true,
            isFiltersExpanded: false,
            advancedFilters: [],
            rows: [],
            columns: [],
            filtered: 0,
            localParams: DEFAULT_POST_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        ...mapState('authentication', [
            'user',
        ]),
        ...mapState('list', [
            'disabledElements',
        ]),
        extendedActionHeader() {
            return this.$getExtendSlot('@Products/components/Grids/AddProductRelationsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/AddProductRelationsGrid/footer');
        },
        extendedAdvancedFilters() {
            return this.$getExtendSlot('@Products/components/Grids/AddProductRelationsGrid/advancedFilters');
        },
        collectionCellBinding() {
            return {
                imageColumn: 'esa_default_image',
                descriptionColumn: 'esa_default_label',
                type: 'PRODUCT_ATTACH',
                additionalColumns: [
                    'attached',
                ],
            };
        },
        filters() {
            return [
                ...getParsedFiltersList(this.localParams.filters),
                ...getParsedFiltersList(this.advancedFilterValues),
            ];
        },
        isAnyFilter() {
            return this.filtered === 0
                && (Object.keys(this.localParams.filters).length > 0
                    || Object.keys(this.advancedFilterValues).length > 0);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    watch: {
        advancedFilterValues() {
            this.onFetchData();
        },
    },
    created() {
        this.onDebounceSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.onDebounceSearch;
    },
    methods: {
        ...mapActions('list', [
            'removeDisabledElement',
            'setDisabledElement',
        ]),
        onFiltersExpand() {
            this.isFiltersExpanded = !this.isFiltersExpanded;
        },
        onAddProductRelations(relations) {
            this.$emit('input', [
                ...this.value,
                ...relations,
            ]);
        },
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.pagination.page = 1;
            this.localParams.filters = filters;
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

            this.onFetchData();
        },
        onRemoveAllFilters() {
            this.pagination.page = 1;
            this.localParams.filters = {};
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onColumnSortChange(sortOrder) {
            this.localParams.sortOrder = sortOrder;

            this.onFetchData();
        },
        async onDropFilter(filterId) {
            const filterCode = filterId.split('/')[1];
            const params = {
                limit: 0,
                offset: 0,
                columns: filterCode,
            };

            await getAdvancedFiltersData({
                $route: this.$route,
                $cookies: this.$userCookies,
                $axios: this.$axios,
                $addAlert: this.$addAlert,
                path: 'products',
                params,
                onSuccess: payload => this.onGetAdvancedFilterSuccess({
                    ...payload,
                    filterCode,
                }),
            });
        },
        async onFetchData() {
            const {
                sortOrder = {},
                ...rest
            } = this.localParams;
            const {
                language,
            } = this.user;

            const {
                filters,
            } = this;

            if (this.productId) {
                filters.push({
                    column: 'id',
                    operator: FILTER_OPERATOR.NOT_EQUAL,
                    value: [
                        this.productId,
                        ...this.value,
                    ].join(','),
                });
            }

            await postGridData({
                $route: this.$route,
                $cookies: this.$userCookies,
                $axios: this.$axios,
                path: 'products/grid',
                data: {
                    ...rest,
                    ...sortOrder,
                    filters,
                    columns: [
                        {
                            name: 'sku',
                        },
                        {
                            name: 'esa_template',
                            language,
                        },
                        {
                            name: 'esa_default_label',
                            language,
                        },
                        {
                            name: 'esa_default_image',
                            language,
                        },
                        {
                            name: '_links',
                            language,
                        },
                    ],
                },
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
                message: this.$t('@Products.product.components.AddProductRelationsGrid.errorGetMessage'),
            });
        },
        onGetAdvancedFilterSuccess({
            advancedFilters,
            filterCode,
        }) {
            if (advancedFilters.length) {
                const filter = advancedFilters.find(({
                    id,
                }) => id === filterCode);

                if (filter.attributeId) {
                    this.setDisabledElement(getDisabledElement({
                        languageCode: filter.languageCode,
                        elementId: filter.attributeId,
                        disabledElements: this.disabledElements,
                    }));
                }

                this.advancedFilters.unshift(filter);
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@Products.product.components.ProductsGrid.noFilterErrorMessage'),
                });
            }
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.AddProductRelationsGrid.successRemoveMessage'),
            });
            this.onFetchData();
        },
        onSearch(value) {
            this.searchValue = value;
        },
        onAdvancedFilterRemove({
            filter,
        }) {
            this.disableListElement({
                languageCode: filter.languageCode,
                attributeId: filter.attributeId,
            });

            this.advancedFilters = this.advancedFilters.filter(({
                id,
            }) => id !== filter.id);

            this.$emit('remove-filter', filter.id);
        },
        onAdvancedFilterRemoveAll() {
            this.advancedFilters.forEach(({
                attributeId,
                languageCode,
            }) => {
                this.disableListElement({
                    languageCode,
                    attributeId,
                });
            });

            this.advancedFilters = [];

            this.$emit('remove-all-filters');
        },
        onAdvancedFilterChange(filters) {
            this.$emit('change-filter', filters);
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
        disableListElement({
            languageCode,
            attributeId,
        }) {
            if (this.disabledElements[languageCode][attributeId]) {
                this.setDisabledElement({
                    languageCode,
                    elementId: attributeId,
                    disabled: false,
                });
            } else {
                this.removeDisabledElement({
                    languageCode,
                    elementId: attributeId,
                });
            }
        },
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                filters: this.filters,
                ...props,
            };
        },
    },
};
</script>
