/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :pagination="pagination"
                :drafts="drafts"
                :filters="filterValues"
                :collection-cell-binding="collectionCellBinding"
                :extended-components="extendedGridComponents"
                :is-editable="isAllowedToUpdate"
                :is-prefetching-data="isPrefetchingData"
                :is-collection-layout="true"
                :is-basic-filter="true"
                :is-header-visible="true"
                :is-border="true"
                @delete-row="onRemoveProduct"
                @pagination="onPaginationChange"
                @column-sort="onColumnSortChange"
                @remove-all-filters="onRemoveAllFilters"
                @filter="onFilterChange">
                <template #actionsHeader>
                    <ActionButton
                        title="ADD PRODUCTS"
                        :theme="secondaryTheme"
                        :disabled="!isAllowedToUpdate"
                        :size="smallSize"
                        :options="addProductOptions"
                        :fixed-content="true"
                        @input="onSelectAddProductOption">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </ActionButton>
                </template>
            </Grid>
            <Component
                v-if="selectedAppModalOption"
                :is="modalComponent"
                @close="onCloseModal"
                @submitted="onCreatedData" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import {
    ADD_PRODUCT,
} from '@Products/defaults';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import Button from '@UI/components/Button/Button';
import Grid from '@UI/components/Grid/Grid';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductGroupTab',
    components: {
        CenterViewTemplate,
        ActionButton,
        IconAdd,
        Grid,
        Button,
        IconSpinner,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
        tabFeedbackMixin,
    ],
    data() {
        return {
            columns: [],
            rows: [],
            filtered: 0,
            filterValues: {},
            selectedAppModalOption: null,
            isPrefetchingData: false,
            localParams: DEFAULT_GRID_FETCH_PARAMS,
            pagination: DEFAULT_GRID_PAGINATION,
        };
    },
    computed: {
        ...mapState('product', [
            'id',
        ]),
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        addProductOptions() {
            const options = Object.values(ADD_PRODUCT);

            if (this.extendedComponents.length) {
                this.extendedComponents.forEach((option) => {
                    options.push(option.name);
                });
            }

            return options;
        },
        extendedComponents() {
            return this.$getExtendedComponents('@Products/components/Tabs/ProductGroupTab/addProductFrom') || [];
        },
        modalComponent() {
            let extendedOptions = [];

            if (this.extendedComponents.length) {
                extendedOptions = this.extendedComponents;
            }
            const modals = [
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsFromListModalGrid'),
                    name: ADD_PRODUCT.FROM_LIST,
                },
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsFromSegmentModalForm'),
                    name: ADD_PRODUCT.FROM_SEGMENT,
                },
                ...extendedOptions,
            ];

            return modals.find(modal => modal.name === this.selectedAppModalOption).component;
        },
    },
    async created() {
        this.isPrefetchingData = true;

        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    methods: {
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

            this.onFetchData();
        },
        onColumnSortChange(sortedColumn) {
            this.localParams.sortedColumn = sortedColumn;

            this.onFetchData();
        },
        onFilterChange(filters) {
            this.filterValues = filters;
            this.pagination.page = 1;
            this.localParams.filter = filters;
            this.localParams.offset = (this.pagination.page - 1) * this.pagination.itemsPerPage;

            this.onFetchData();
        },
        onRemoveAllFilters() {
            this.filterValues = {};
            this.pagination.page = 1;
            this.localParams.filter = {};
            this.localParams.offset = 0;

            this.onFetchData();
        },
        onSelectAddProductOption(option) {
            this.selectedAppModalOption = option;
        },
        onCloseModal() {
            this.selectedAppModalOption = null;
        },
        async onCreatedData() {
            this.isPrefetchingData = true;

            await this.onFetchData(this.localParams);

            this.isPrefetchingData = false;
        },
        onRemoveProduct() {
            this.onFetchData();
        },
        async onFetchData({
            offset,
            limit,
            filter,
            sortedColumn,
        } = this.localParams) {
            const filtersWithAttached = {
                ...filter,
            };

            if (typeof filter.attached === 'undefined') {
                filtersWithAttached.attached = {
                    [FILTER_OPERATOR.EQUAL]: true,
                };
            }

            this.localParams = {
                offset,
                limit,
                filter: filtersWithAttached,
                extended: true,
                sortedColumn,
            };

            if (Object.keys(sortedColumn).length) {
                const {
                    index: colSortID, orderState,
                } = sortedColumn;

                this.localParams.field = colSortID;
                this.localParams.order = orderState;
            }

            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `products/${this.id}/children-and-available-products`,
                params: this.localParams,
                onSuccess: this.onFetchGridDataSuccess,
                onError: this.onFetchGridDataError,
            });
        },
        onFetchGridDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Grid data haven’t been fetched properly',
            });
        },
        onFetchGridDataSuccess({
            columns,
            rows,
            filtered,
        }) {
            this.columns = columns
                .filter(column => column.id !== 'attached')
                .map(column => ({
                    ...column,
                    editable: false,
                }));
            this.filtered = filtered;
            this.rows = rows;
        },
    },
};
</script>
