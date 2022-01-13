/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :scope="scope"
        :columns="columns"
        :rows="rows"
        :drafts="drafts"
        :filters="filterValues"
        :sort-order="sortOrder"
        :errors="errors"
        :data-count="filtered"
        :pagination="pagination"
        :layout="layout"
        :custom-layouts="customLayouts"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-header-visible="true"
        :is-basic-filter="true"
        :is-collection-layout="true"
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
        @remove-all-filters="onRemoveAllFilters"
        @layout="onLayoutChange"
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
                :title="$t('@Products.product.components.ProductsGrid.filtersButtonTitle')"
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
                :scope="scope"
                :value="advancedFilterValues"
                :filters="advancedFilters"
                :extended-filters="extendedAdvancedFilters"
                @swap="onAdvancedFilterPositionChange"
                @remove="onAdvancedFilterRemove"
                @remove-all="onAdvancedFilterRemoveAll"
                @input="onAdvancedFilterChange" />
        </template>
        <template #noDataPlaceholder>
            <ProductsGridNoDataPlaceholder v-if="!isAnyFilter && filtered === 0" />
            <GridNoResultsPlaceholder
                v-else
                @clear="onRemoveAllFilters" />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
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

<script>
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
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
    changeCookiePosition,
    insertCookieAtIndex,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    getDefaultDataFromQueryParams,
    getFilterQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getDisabledElement,
    getDisabledElements,
} from '@Core/models/mappers/sideBarDataMapper';
import {
    getAdvancedFiltersData,
    getGridData,
} from '@Core/services/grid/getGridData.service';
import ProductAdvancedFilters from '@Products/components/AdvancedFilters/ProductAdvancedFilters';
import UpdateProductsButton from '@Products/components/Buttons/UpdateProductsButton';
import ProductsGridNoDataPlaceholder from '@Products/components/Placeholders/ProductsGridNoDataPlaceholder';
import PRIVILEGES from '@Products/config/privileges';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import {
    PRODUCT_CREATED_EVENT_NAME,
} from '@Products/defaults';
import AdvancedFilters from '@UI/components/AdvancedFilters/AdvancedFilters';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductsGrid',
    components: {
        ProductsGridNoDataPlaceholder,
        ProductAdvancedFilters,
        UpdateProductsButton,
        ExpandNumericButton,
        AdvancedFilters,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/components/Grids/ProductsGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
    props: {
        layout: {
            type: String,
            required: true,
        },
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
        const advFiltersIds = this.$userCookies.get(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

        if (advFiltersIds) {
            requests.push(this.onFetchAdvancedFilters(advFiltersIds));
        }

        await Promise.all(requests);
        this.isPrefetchingData = false;

        this.setDisabledScopeElements({
            scope: this.scope,
            disabledElements: getDisabledElements({
                elements: [
                    ...this.columns.filter(column => column.visible),
                    ...this.advancedFilters,
                ],
                defaultLanguageCode: this.userLanguageCode,
            }),
        });
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
            customLayouts: [],
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
            return this.$getExtendedLayoutSlot({
                key: '@Products/components/Grids/ProductsGrid/actionHeader',
                layout: this.layout,
            });
        },
        extendedFooter() {
            return this.$getExtendedLayoutSlot({
                key: '@Products/components/Grids/ProductsGrid/footer',
                layout: this.layout,
            });
        },
        extendedAdvancedFilters() {
            return this.$getExtendedLayoutSlot({
                key: '@Products/components/Grids/ProductsGrid/advancedFilters',
                layout: this.layout,
            });
        },
        collectionCellBinding() {
            return {
                imageColumn: 'esa_default_image',
                descriptionColumn: 'esa_default_label',
            };
        },
        isAnyFilter() {
            return this.filtered === 0
                && (Object.keys(this.filterValues).length > 0
                    || Object.keys(this.advancedFilterValues).length > 0);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    watch: {
        async $route(to, from) {
            if (from.name !== to.name) {
                return;
            }

            this.isPrefetchingData = true;
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
    async mounted() {
        await this.extendedCustomLayouts();

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
            'removeDisabledScopeElement',
            'setDisabledScopeElement',
            'setDisabledScopeElements',
        ]),
        onLayoutChange(layout) {
            this.$emit('layout', layout);
        },
        async onProductCreated() {
            this.isPrefetchingData = true;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
        async extendedCustomLayouts() {
            const customLayouts = await this.$getExtendMethod('@Products/components/Grids/ProductsGrid/customLayouts', {
                $this: this,
            });

            this.customLayouts = []
                .concat(...customLayouts)
                .filter(layout => typeof layout.layout !== 'undefined');
        },
        async onDropColumn(payload) {
            const columnCode = payload.split('/')[1];

            this.$gridCookies.insertAtIndex(
                this.layout,
                0,
                columnCode,
            );

            await getGridData({
                $cookies: this.$gridCookies,
                $axios: this.$axios,
                layout: this.layout,
                path: 'products',
                params: getParams({
                    $route: this.$route,
                    $cookies: this.$gridCookies,
                    layout: this.layout,
                    defaultColumns: 'esa_index,esa_sku,esa_default_image,esa_default_label',
                }),
                onSuccess: (data) => {
                    this.onFetchDataSuccess(data);

                    const column = this.columns.find(({
                        id,
                    }) => id === columnCode);

                    if (column && column.element_id) {
                        this.setDisabledScopeElement({
                            disabledElement: getDisabledElement({
                                languageCode: column.language,
                                elementId: column.element_id,
                                disabledElements: this.disabledElements[this.scope],
                            }),
                            scope: this.scope,
                        });
                    }
                },
                onError: () => {
                    this.$gridCookies.removeAtIndex(
                        this.layout,
                        0,
                    );
                },
            });
        },
        onSwapColumns({
            from,
            to,
        }) {
            this.$gridCookies.changePosition(this.layout, from, to);
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

                if (this.disabledElements[this.scope][languageCode][element_id]) {
                    this.setDisabledScopeElement({
                        scope: this.scope,
                        disabledElement: {
                            languageCode,
                            elementId: element_id,
                            disabled: false,
                        },
                    });
                } else {
                    this.removeDisabledScopeElement({
                        languageCode,
                        elementId: element_id,
                        scope: this.scope,
                    });
                }
            }

            const isReplaceRequired = this.sortOrder.field === column.id
                || typeof this.filterValues[column.id] !== 'undefined';

            this.$gridCookies.removeAtIndex(this.layout, index);

            if (isReplaceRequired) {
                delete this.filterValues[id];

                const filter = getParsedFilters(this.filterValues);

                const query = {
                    ...this.$route.query,
                    filter,
                };

                if (query.field === id) {
                    delete query.field;
                    delete query.order;
                }

                if (query.filter === '' || query.filter === null) {
                    delete query.filter;
                }

                this.$router.replace({
                    query,
                });
            } else {
                this.columns.splice(index, 1);
            }
        },
        onAdvancedFilterPositionChange({
            from,
            to,
        }) {
            changeCookiePosition({
                cookies: this.$userCookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                from,
                to,
            });
        },
        onAdvancedFilterChange(filters) {
            const query = {
                ...this.$route.query,
                advancedFilter: getParsedFilters(filters),
                page: DEFAULT_PAGE,
            };

            if (query.advancedFilter === '' || query.advancedFilter === null) {
                delete query.advancedFilter;
            }

            this.$router.replace({
                query,
            });
        },
        onAdvancedFilterRemove({
            index,
            filter,
        }) {
            const isReplaceRequired = typeof this.advancedFilterValues[filter.id] !== 'undefined';

            removeCookieAtIndex({
                cookies: this.$userCookies,
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

            if (isReplaceRequired) {
                delete this.advancedFilterValues[filter.id];

                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        advancedFilter: getParsedFilters(this.advancedFilterValues),
                        page: DEFAULT_PAGE,
                    },
                });
            }
        },
        onAdvancedFilterRemoveAll() {
            const isReplaceRequired = Object.keys(this.advancedFilterValues).length > 0;

            this.$userCookies.remove(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

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

            if (isReplaceRequired) {
                const query = {
                    ...this.$route.query,
                    page: DEFAULT_PAGE,
                };

                delete query.advancedFilter;

                this.$router.replace({
                    query,
                });
            }
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
        async onProductsUpdated() {
            this.isPrefetchingData = true;
            await this.onFetchData();

            const rows = [];

            Object.keys(this.drafts).forEach((row) => {
                if (typeof this.errors[row] === 'undefined') {
                    rows.push(row);
                }
            });

            this.removeDrafts(rows);
            this.isPrefetchingData = false;
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
                $cookies: this.$userCookies,
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
                cookies: this.$userCookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                index: 0,
                data: filterCode,
            });

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
                    this.setDisabledScopeElement({
                        disabledElement: getDisabledElement({
                            languageCode: filter.languageCode,
                            elementId: filter.attributeId,
                            disabledElements: this.disabledElements[this.scope],
                        }),
                        scope: this.scope,
                    });
                }

                this.advancedFilters.unshift(filter);
            } else {
                removeCookieAtIndex({
                    cookies: this.$userCookies,
                    cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                    index: 0,
                });

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@Products.product.components.ProductsGrid.noFilterErrorMessage'),
                });
            }
        },
        onGetAdvancedFilterError() {
            removeCookieAtIndex({
                cookies: this.$userCookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                index: 0,
            });
        },
        disableListElement({
            languageCode,
            attributeId,
        }) {
            if (this.disabledElements[this.scope][languageCode][attributeId]) {
                this.setDisabledScopeElement({
                    scope: this.scope,
                    disabledElement: {
                        languageCode,
                        elementId: attributeId,
                        disabled: false,
                    },
                });
            } else {
                this.removeDisabledScopeElement({
                    languageCode,
                    elementId: attributeId,
                    scope: this.scope,
                });
            }
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
                    elementId: cachedElementIds[columnId],
                    productId: rowId,
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
        async onRemoveRow() {
            this.isPrefetchingData = true;

            await this.onFetchData();
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.ProductsGrid.removeSuccessMessage'),
            });

            this.isPrefetchingData = false;
        },
        async onFetchData() {
            await getGridData({
                $cookies: this.$gridCookies,
                $axios: this.$axios,
                layout: this.layout,
                path: 'products',
                params: getParams({
                    $route: this.$route,
                    $cookies: this.$gridCookies,
                    layout: this.layout,
                    defaultColumns: 'esa_index,esa_sku,esa_default_image,esa_default_label',
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
                message: this.$t('@Products.product.components.ProductsGrid.getErrorMessage'),
            });
        },
        onRemoveAllFilters() {
            const query = {
                ...this.$route.query,
                page: DEFAULT_PAGE,
            };

            delete query.filter;
            delete query.advancedFilter;

            this.$router.replace({
                query,
            });
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
    },
};
</script>
