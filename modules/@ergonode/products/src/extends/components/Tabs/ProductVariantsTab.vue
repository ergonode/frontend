/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                v-if="bindings.length || isPrefetchingData"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :drafts="drafts"
                :pagination="pagination"
                :filters="filterValues"
                :collection-cell-binding="collectionCellBinding"
                :placeholder="gridPlaceholder"
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
                    <ExpandNumericButton
                        title="BINDING ATTRIBUTES"
                        :number="bindings.length"
                        :is-expanded="isBindingAttributesExpanded"
                        @click.native="onBindingAttributesExpand" />
                    <AddProductVariantsButton
                        title="ADD PRODUCTS"
                        :theme="secondaryTheme"
                        @added="onAddedProductVariants">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </AddProductVariantsButton>
                </template>
                <template #appendHeader>
                    <BindingAttributes
                        v-if="isBindingAttributesExpanded"
                        :attributes="bindingAttributes"
                        @remove-binding="onRemoveBinding"
                        @added="onAddedBindingAttributes" />
                </template>
                <template #actionPlaceholder>
                    <AddProductVariantsButton
                        title="CHOOSE VARIANTS"
                        @added="onAddedProductVariants" />
                </template>
            </Grid>
            <ListPlaceholder
                v-else
                v-bind="listPlaceholder">
                <template #action>
                    <AddBindingAttributesButton @added="onAddedBindingAttributes" />
                </template>
            </ListPlaceholder>
        </template>
    </CenterViewTemplate>
</template>

<script>
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_GRID_PAGINATION,
} from '@Core/defaults/grid';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
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
import BindingAttributes from '@Products/extends/components/BindingAttributes/BindingAttributes';
import AddBindingAttributesButton from '@Products/extends/components/Buttons/AddBindingAttributesButton';
import AddProductVariantsButton from '@Products/extends/components/Buttons/AddProductVariantsButton';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Grid from '@UI/components/Grid/Grid';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import ListPlaceholder from '@UI/components/List/ListPlaceholder';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductVariantsTab',
    components: {
        ListPlaceholder,
        CenterViewTemplate,
        Grid,
        ExpandNumericButton,
        BindingAttributes,
        IconAdd,
        AddProductVariantsButton,
        AddBindingAttributesButton,
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
            localParams: DEFAULT_GRID_FETCH_PARAMS(),
            pagination: DEFAULT_GRID_PAGINATION(),
            isPrefetchingData: false,
            isBindingAttributesExpanded: false,
        };
    },
    computed: {
        ...mapState('product', [
            'id',
            'selectAttributes',
            'bindings',
        ]),
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        gridPlaceholder() {
            return {
                title: 'No product variants',
                subtitle: 'Choose products which together will create a product with variants. You can choose between products which contain selected binding attributes.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        listPlaceholder() {
            return {
                style: 'width: 560px; max-height: 280px; margin-top: 24px; align-self: center',
                layoutOrientation: this.horizontalOrientation,
                title: 'No binding attributes',
                subtitle: 'Binding attribute is the common attribute of the products, which link products together into the product with variants.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
            };
        },
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        bindingAttributes() {
            return this.selectAttributes
                .filter(
                    attribute => this.bindings
                        .some(
                            id => attribute.id === id,
                        ),
                );
        },
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
    },
    async created() {
        this.isPrefetchingData = true;

        await Promise.all([
            this.getSelectAttributes(),
            this.getProductBindings(this.$route.params.id),
        ]);

        if (this.bindings.length) {
            await this.onFetchData();
        }

        this.isPrefetchingData = false;
    },
    methods: {
        ...mapActions('product', [
            'getProductBindings',
            'getSelectAttributes',
            'removeBinding',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onPaginationChange(pagination) {
            this.pagination = pagination;
            this.localParams.limit = pagination.itemsPerPage;
            this.localParams.offset = (pagination.page - 1) * pagination.itemsPerPage;

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
        onColumnSortChange(sortedColumn) {
            this.localParams.sortedColumn = sortedColumn;

            this.onFetchData();
        },
        async onAddedProductVariants() {
            this.isPrefetchingData = true;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
        async onAddedBindingAttributes() {
            this.isPrefetchingData = true;

            await Promise.all([
                this.getProductBindings(this.$route.params.id),
                this.onFetchData(),
            ]);

            this.isPrefetchingData = false;
        },
        async onRemoveBinding(index) {
            this.isPrefetchingData = true;

            await this.removeBinding(index);

            await Promise.all([
                this.getProductBindings(this.$route.params.id),
                this.onFetchData(),
            ]);

            this.isPrefetchingData = false;
        },
        onBindingAttributesExpand() {
            this.isBindingAttributesExpanded = !this.isBindingAttributesExpanded;
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
