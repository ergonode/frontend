/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductsBatchActions @batch-action-completed="onBatchActionCompleted">
        <template
            #grid="{
                disabledRows,
                batchActions,
            }">
            <Grid
                :columns="columns"
                :rows="rows"
                :drafts="drafts"
                :filters="filterValues"
                :errors="errors"
                :data-count="filtered"
                :pagination="pagination"
                :collection-cell-binding="collectionCellBinding"
                :batch-actions="batchActions"
                :disabled-rows="disabledRows"
                :extended-components="extendedGridComponents"
                :is-editable="isAllowedToUpdate"
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-basic-filter="true"
                :is-collection-layout="true"
                :is-select-column="batchActions.length > 0"
                @edit-row="onEditRow"
                @preview-row="onEditRow"
                @cell-value="onCellValueChange"
                @filter="onFilterChange"
                @delete-row="onRemoveRow"
                @drop-column="onDropColumn"
                @remove-column="onRemoveColumn"
                @swap-columns="onSwapColumns"
                @pagination="onPaginationChange"
                @sort-column="onColumnSortChange"
                @remove-all-filters="onRemoveAllFilters">
                <template #actionsHeader>
                    <ExpandNumericButton
                        title="FILTERS"
                        :number="advancedFilters.length"
                        :is-expanded="isFiltersExpanded"
                        @click.native="onFiltersExpand" />
                    <template v-for="(headerItem, index) in extendedActionHeader">
                        <Component
                            :is="headerItem.component"
                            :key="index"
                            v-bind="bindingProps(headerItem)" />
                    </template>
                </template>
                <template #prependHeader>
                    <AddFilterDropZone
                        :filters="advancedFilters"
                        @drop="onDropFilter" />
                </template>
                <template #appendHeader>
                    <div
                        v-show="isFiltersExpanded"
                        class="products-advanced-filters">
                        <AdvancedFilters
                            :value="advancedFilterValues"
                            :filters="advancedFilters"
                            @swap="onAdvancedFilterPositionChange"
                            @remove="onAdvancedFilterRemove"
                            @remove-all="onAdvancedFilterRemoveAll"
                            @input="onAdvancedFilterChange" />
                    </div>
                </template>
                <template #noDataPlaceholder>
                    <GridNoDataPlaceholder
                        v-if="!isAnyFilter && filtered === 0"
                        :title="$t('@Products._.noProduct')"
                        :subtitle="$t('@Products._.createFirst')">
                        <template #action>
                            <CreateProductButton />
                        </template>
                    </GridNoDataPlaceholder>
                    <GridNoResultsPlaceholder
                        v-else
                        @clear="onRemoveAllFilters" />
                </template>
                <template #appendFooter>
                    <template v-for="(footerItem, index) in extendedFooter">
                        <Component
                            :is="footerItem.component"
                            :key="index"
                            v-bind="bindingProps(footerItem)" />
                    </template>
                    <UpdateProductsButton
                        :scope="scope"
                        :errors="errors"
                        :change-values="changeValues"
                        :drafts="drafts"
                        :columns="columns"
                        @updated="onProductsUpdated" />
                </template>
            </Grid>
        </template>
    </ProductsBatchActions>
</template>

<script>
import ProductsBatchActions from '@BatchActions/components/ProductsBatchActions/ProductsBatchActions';
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_PAGE,
} from '@Core/defaults/grid';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    changeCookiePosition,
    insertCookieAtIndex,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    getDefaultDataFromQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getAdvancedFiltersData,
    getGridData,
} from '@Core/services/grid/getGridData.service';
import CreateProductButton from '@Products/components/Buttons/CreateProductButton';
import UpdateProductsButton from '@Products/components/Buttons/UpdateProductsButton';
import PRIVILEGES from '@Products/config/privileges';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import {
    PRODUCT_CREATED_EVENT_NAME,
} from '@Products/defaults';
import AdvancedFilters from '@UI/components/AdvancedFilters/AdvancedFilters';
import Button from '@UI/components/Button/Button';
import AddFilterDropZone from '@UI/components/Grid/DropZone/AddFilterDropZone';
import RemoveFilterAndColumnDropZone from '@UI/components/Grid/DropZone/RemoveFilterAndColumnDropZone';
import Grid from '@UI/components/Grid/Grid';
import GridNoDataPlaceholder from '@UI/components/Grid/GridNoDataPlaceholder';
import GridNoResultsPlaceholder from '@UI/components/Grid/GridNoResultsPlaceholder';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductsGrid',
    components: {
        CreateProductButton,
        Grid,
        GridNoDataPlaceholder,
        GridNoResultsPlaceholder,
        ProductsBatchActions,
        AddFilterDropZone,
        RemoveFilterAndColumnDropZone,
        Button,
        VerticalTabBar,
        IconSpinner,
        UpdateProductsButton,
        ExpandNumericButton,
        AdvancedFilters,
    },
    mixins: [
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
        const requests = [
            this.onFetchData(),
        ];
        const advFiltersIds = this.$cookies.get(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

        if (advFiltersIds) {
            requests.push(this.onFetchAdvancedFilters(advFiltersIds));
        }

        await Promise.all(requests);

        this.setDisabledElements(this.getDisabledElements({
            columns: this.columns,
            filters: this.advancedFilters,
        }));

        this.isPrefetchingData = false;
    },
    data() {
        const {
            filterValues,
            advancedFilterValues,
            pagination,
            sortOrder,
        } = getDefaultDataFromQueryParams(this.$route);

        return {
            advancedFilterValues,
            filterValues,
            pagination,
            sortOrder,
            rows: [],
            columns: [],
            filtered: 0,
            advancedFilters: [],
            isFiltersExpanded: false,
            isPrefetchingData: true,
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('list', [
            'disabledElements',
        ]),
        extendedActionHeader() {
            return this.$getExtendSlot('@Products/components/Grids/ProductsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/ProductsGrid/footer');
        },
        isAnyFilter() {
            return this.filtered === 0
                && (Object.keys(this.filterValues).length > 0
                    || Object.keys(this.advancedFilterValues).length > 0);
        },
        collectionCellBinding() {
            return {
                imageColumn: 'esa_default_image',
                descriptionColumn: 'esa_default_label',
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    watch: {
        async $route(from, to) {
            if (from.name !== to.name) {
                return;
            }

            const {
                filterValues,
                advancedFilterValues,
                pagination,
                sortOrder,
            } = getDefaultDataFromQueryParams(this.$route);

            this.filterValues = filterValues;
            this.advancedFilterValues = advancedFilterValues;
            this.pagination = pagination;
            this.sortOrder = sortOrder;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
    },
    mounted() {
        document.documentElement.addEventListener(
            PRODUCT_CREATED_EVENT_NAME,
            this.onProductCreated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            PRODUCT_CREATED_EVENT_NAME,
            this.onProductCreated,
        );
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        ...mapActions('product', [
            'validateProduct',
        ]),
        ...mapActions('list', [
            'removeDisabledElement',
            'setDisabledElement',
            'setDisabledElements',
        ]),
        onProductCreated() {
            this.onFetchData();
        },
        onBatchActionCompleted() {
            this.onFetchData();
        },
        async onDropColumn(payload) {
            try {
                const columnCode = payload.split('/')[1];

                insertCookieAtIndex({
                    cookies: this.$cookies,
                    cookieName: `GRID_CONFIG:${this.$route.name}`,
                    index: 0,
                    data: columnCode,
                });

                await this.onFetchData();

                const column = this.columns.find(({
                    id,
                }) => id === columnCode);

                if (column && column.element_id) {
                    this.setDisabledElement(this.getDisabledListElement({
                        languageCode: column.language,
                        attributeId: column.element_id,
                        disabledElements: this.disabledElements,
                    }));
                }
            } catch {
                removeCookieAtIndex({
                    cookies: this.$cookies,
                    cookieName: `GRID_CONFIG:${this.$route.name}`,
                    index: 0,
                });
            }
        },
        onSwapColumns({
            from,
            to,
        }) {
            changeCookiePosition({
                cookies: this.$cookies,
                cookieName: `GRID_CONFIG:${this.$route.name}`,
                from,
                to,
            });
        },
        onRemoveColumn({
            index,
            column,
        }) {
            const {
                id,
                element_id,
            } = column;

            if (element_id) {
                const {
                    language: languageCode = this.userLanguageCode,
                } = column;

                if (this.disabledElements[languageCode][element_id]) {
                    this.setDisabledElement({
                        languageCode,
                        elementId: element_id,
                        disabled: false,
                    });
                } else {
                    this.removeDisabledElement({
                        languageCode,
                        elementId: element_id,
                    });
                }
            }

            delete this.filterValues[id];

            removeCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_CONFIG:${this.$route.name}`,
                index,
            });

            this.$router.replace({
                query: {
                    ...this.$route.query,
                    filter: getParsedFilters(this.filterValues),
                    page: DEFAULT_PAGE,
                },
            });

            this.onFetchData();
        },
        onAdvancedFilterPositionChange({
            from,
            to,
        }) {
            changeCookiePosition({
                cookies: this.$cookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                from,
                to,
            });
        },
        onAdvancedFilterChange(filters) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    advancedFilter: getParsedFilters(filters),
                    page: DEFAULT_PAGE,
                },
            });
        },
        onAdvancedFilterRemove({
            index,
            filter,
        }) {
            delete this.advancedFilterValues[filter.id];

            removeCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                index,
            });

            this.disableListElement({
                languageCode: filter.languageCode,
                attributeId: filter.attributeId,
            });

            this.advancedFilters = this.advancedFilters.filter(({
                id,
            }) => id !== filter.id);

            this.$router.replace({
                query: {
                    ...this.$route.query,
                    advancedFilter: getParsedFilters(this.advancedFilterValues),
                    page: DEFAULT_PAGE,
                },
            });
        },
        onAdvancedFilterRemoveAll() {
            this.$cookies.remove(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

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

            this.$router.replace({
                query: {
                    ...this.$route.query,
                    advancedFilter: '',
                    page: DEFAULT_PAGE,
                },
            });
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
        getDisabledElements({
            columns,
            filters,
        }) {
            const disabledElements = {};

            [
                ...columns,
                ...filters,
            ].forEach((element) => {
                const attributeId = element.attributeId || element.element_id;

                if (attributeId) {
                    const languageCode = element.languageCode || this.userLanguageCode;

                    if (typeof disabledElements[languageCode] === 'undefined') {
                        disabledElements[languageCode] = {};
                    }

                    disabledElements[languageCode][attributeId] = Boolean(
                        disabledElements[languageCode]
                        && typeof disabledElements[languageCode][attributeId] !== 'undefined',
                    );
                }
            });

            return disabledElements;
        },
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
        async onProductsUpdated() {
            const rows = [];

            Object.keys(this.drafts).forEach((row) => {
                if (typeof this.errors[row] === 'undefined') {
                    rows.push(row);
                }
            });

            await this.onFetchData();

            this.removeDrafts(rows);
        },
        onFiltersExpand() {
            this.isFiltersExpanded = !this.isFiltersExpanded;
        },
        async onFetchAdvancedFilters(ids) {
            const filtersParams = {
                offset: 0,
                limit: 0,
                columns: ids,
            };

            await getAdvancedFiltersData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: 'products',
                params: filtersParams,
                onSuccess: this.onFetchAdvancedFiltersSuccess,
            });
        },
        onFetchAdvancedFiltersSuccess({
            advancedFilters,
        }) {
            this.advancedFilters = advancedFilters;
        },
        async onDropFilter(filterId) {
            const filterCode = filterId.split('/')[1];
            const params = {
                limit: 0,
                offset: 0,
                columns: filterCode,
            };

            insertCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                index: 0,
                data: filterCode,
            });

            await getAdvancedFiltersData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                $addAlert: this.$addAlert,
                path: 'products',
                params,
                onSuccess: payload => this.onGetAdvancedFilterSuccess({
                    ...payload,
                    filterCode,
                }),
                onError: this.onGetAdvancedFilterError,
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
                    this.setDisabledElement(this.getDisabledListElement({
                        languageCode: filter.languageCode,
                        attributeId: filter.attributeId,
                        disabledElements: this.disabledElements,
                    }));
                }

                this.advancedFilters.unshift(filter);
            } else {
                removeCookieAtIndex({
                    cookies: this.$cookies,
                    cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                    index: 0,
                });

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Attribute has no filter',
                });
            }
        },
        onGetAdvancedFilterError() {
            removeCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                index: 0,
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
        getDisabledListElement({
            languageCode,
            attributeId,
            disabledElements,
        }) {
            return {
                languageCode,
                elementId: attributeId,
                disabled: Boolean(disabledElements[languageCode]
                    && typeof disabledElements[languageCode][attributeId] !== 'undefined'),
            };
        },
        async onCellValueChange(cellValues) {
            const cachedElementIds = {};

            const drafts = cellValues.reduce((prev, {
                rowId, columnId, value,
            }) => {
                const tmp = prev;
                tmp[`${rowId}/${columnId}`] = value;
                return tmp;
            }, {});

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });

            const requests = cellValues.map(async ({
                rowId,
                columnId,
                value,
            }) => {
                if (!cachedElementIds[columnId]) {
                    const {
                        element_id,
                    } = this.columns.find(column => column.id === columnId);

                    cachedElementIds[columnId] = element_id;
                }

                await this.validateProduct({
                    fieldKey: `${rowId}/${columnId}`,
                    languageCode: columnId.split(':')[1],
                    productId: rowId,
                    elementId: cachedElementIds[columnId],
                    value,
                    scope: this.scope,
                });
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'productsGrid',
                value: this.drafts,
            });

            await Promise.all(requests);
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product removed',
            });
            this.onFetchData();
        },
        async onFetchData() {
            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: 'products',
                params: getParams({
                    $route: this.$route,
                    $cookies: this.$cookies,
                    defaultColumns: 'index,sku,_links,esa_default_image,esa_default_label',
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
                message: 'Products haven’t been fetched properly',
            });
        },
        onRemoveAllFilters() {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    filter: '',
                    advancedFilter: '',
                    page: DEFAULT_PAGE,
                },
            });

            this.isPrefetchingData = true;
        },
        onFilterChange(filters) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ...this.pagination,
                    filter: getParsedFilters(filters),
                },
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
    },
};
</script>

<style lang="scss" scoped>
    .products-advanced-filters {
        margin-left: 16px;
    }
</style>
