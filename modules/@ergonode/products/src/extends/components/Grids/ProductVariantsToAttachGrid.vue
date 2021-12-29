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
        :disabled-rows="disabledProducts"
        :drafts="drafts"
        :pagination="pagination"
        :filters="filterValues"
        :sort-order="localParams.sortOrder"
        :collection-cell-binding="collectionCellBinding"
        :extended-components="extendedGridComponents"
        :layout="layout"
        :is-prefetching-data="isPrefetchingData"
        :is-collection-layout="true"
        :is-editable="true"
        :is-header-visible="true"
        :is-basic-filter="true"
        :is-action-column="false"
        @cell-value="onCellValueChange"
        @pagination="onPaginationChange"
        @sort-column="onColumnSortChange"
        @remove-all-filters="onRemoveAllFilters"
        @filter="onFilterChange"
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
        </template>
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('@Products.productExtend.components.ProductVariantsToAttachGrid.noProducts')"
                :subtitle="$t('@Products.productExtend.components.ProductVariantsToAttachGrid.changeBindingAttributes')" />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <UpdateProductsAttachmentButton
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                :skus="skus"
                @updated="onProductsAttachmentUpdated" />
        </template>
    </Grid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import UpdateProductsAttachmentButton from '@Products/extends/components/Buttons/UpdateProductsAttachmentButton';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductVariantsToAttachGrid',
    components: {
        UpdateProductsAttachmentButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/extends/components/Grids/ProductVariantsToAttachGrid/props',
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
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    async fetch() {
        await Promise.all([
            this.getProductVariants(),
            this.onFetchData(),
        ]);

        this.isPrefetchingData = false;
    },
    data() {
        return {
            layout: GRID_LAYOUT.TABLE,
            columns: [],
            rows: [],
            productVariants: [],
            filtered: 0,
            filterValues: {},
            isPrefetchingData: true,
            skus: {},
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
        };
    },
    computed: {
        ...mapState('product', [
            'id',
            'bindings',
            'selectAttributes',
        ]),
        extendedActionHeader() {
            return this.$getExtendSlot('@Products/components/Grids/ProductsVariantsToAttachGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/ProductsVariantsToAttachGrid/footer');
        },
        bindingAttributes() {
            return this.selectAttributes.filter(
                attribute => this.bindings.some(
                    binding => binding === attribute.id,
                ),
            );
        },
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
                type: 'PRODUCT_ATTACH',
                additionalColumns: [
                    'attached',
                ],
            };
        },
        disabledProductCombinations() {
            const disabledCombinations = [];

            this.productVariants.forEach((row) => {
                const combinations = [];

                this.bindingAttributes.forEach((binding) => {
                    combinations.push(row[binding.key].value);
                });

                disabledCombinations.push(combinations.join('|'));
            });

            return disabledCombinations;
        },
        disabledProducts() {
            const disabledProducts = {};

            this.rows.forEach((row) => {
                if (!(this.drafts[`${row.id.value}/attached`]
                    || (row.attached.value && typeof this.drafts[`${row.id.value}/attached`] === 'undefined'))) {
                    const combinations = [];

                    this.bindingAttributes.forEach((binding) => {
                        combinations.push(row[binding.key].value);
                    });

                    if (this.disabledProductCombinations.includes(combinations.join('|'))) {
                        disabledProducts[row.id.value] = true;
                    }
                }
            });

            return disabledProducts;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onLayoutChange(layout) {
            this.layout = layout;
        },
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;
            this.pagination.page = 1;
            this.localParams.filter = getParsedFilters(filters);
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

            this.onFetchData();
        },
        onRemoveAllFilters() {
            this.filterValues = {};
            this.pagination.page = 1;
            this.localParams.filter = '';
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onColumnSortChange(sortOrder) {
            this.localParams.sortOrder = sortOrder;

            this.onFetchData();
        },
        async onProductsAttachmentUpdated() {
            const skusKeys = Object.keys(this.skus);

            skusKeys.forEach((key) => {
                const rowIndex = this.rows.findIndex(({
                    id,
                }) => id.value === key);

                if (rowIndex !== -1) {
                    this.rows[rowIndex].attached.value = this.skus[key].value;
                }
            });

            this.setDrafts();
            this.skus = {};
        },
        async getProductVariants() {
            const params = {
                offset: 0,
                limit: 99999,
                view: 'list',
                extended: true,
                filter: `attached${FILTER_OPERATOR.EQUAL}true`,
            };

            await getGridData({
                $axios: this.$axios,
                path: `products/${this.id}/children-and-available-products`,
                params,
                onSuccess: this.onFetchProductVariantsSuccess,
                onError: this.onFetchProductsVariantsError,
            });
        },
        onFetchProductVariantsSuccess({
            rows,
        }) {
            this.productVariants = rows;
        },
        onFetchProductsVariantsError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Products.productExtend.components.ProductVariantsToAttachGrid.getRequest'),
            });

            this.isPrefetchingData = false;
        },
        async onFetchData() {
            const {
                sortOrder = {}, ...rest
            } = this.localParams;

            const params = {
                ...rest,
                ...sortOrder,
            };

            await getGridData({
                $axios: this.$axios,
                path: `products/${this.id}/children-and-available-products`,
                params,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Products.productExtend.components.ProductVariantsToAttachGrid.getRequest'),
            });

            this.isPrefetchingData = false;
        },
        onFetchGridDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns.map((column) => {
                if (column.id === 'attached') {
                    return {
                        ...column,
                        filter: {
                            type: 'SELECT',
                            options: {
                                false: {
                                    label: this.$t('@Products.productExtend.components.ProductVariantsToAttachGrid.notAttachedLabel'),
                                },
                                true: {
                                    label: this.$t('@Products.productExtend.components.ProductVariantsToAttachGrid.attachedLabel'),
                                },
                            },
                        },
                    };
                }

                return {
                    ...column,
                    editable: false,
                };
            });
            this.rows = rows;
            this.filtered = filtered;

            this.isPrefetchingData = false;
        },
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId,
                columnId,
                value,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;

                const row = this.rows.find(({
                    id,
                }) => rowId === id.value);

                this.skus[rowId] = {
                    sku: row.sku.value,
                    value,
                };

                if (value) {
                    this.productVariants.push(row);
                } else {
                    this.productVariants = this.productVariants.filter(({
                        id,
                    }) => id.value !== rowId);
                }
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'productVariantsToAttachGrid',
                value: this.drafts,
            });
        },
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                query: getParsedFilters(this.localParams.filter),
                ...props,
            };
        },
    },
};
</script>
