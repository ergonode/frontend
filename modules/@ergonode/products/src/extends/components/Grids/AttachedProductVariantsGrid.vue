/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :drafts="drafts"
        :sort-order="sortOrder"
        :filters="filterValues"
        :collection-cell-binding="collectionCellBinding"
        :placeholder="gridPlaceholder"
        :pagination="pagination"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-collection-layout="true"
        :is-header-visible="true"
        :is-border="true"
        @pagination="onPaginationChange"
        @delete-row="onRemoveRow"
        @sort-column="onColumnSortChange"
        @filter="onFilterChange"
        @remove-all-filters="onRemoveAllFilters">
        <template #actionsHeader>
            <ExpandNumericButton
                title="BINDING ATTRIBUTES"
                :number="bindings.length"
                :is-expanded="isBindingAttributesExpanded"
                @click.native="onBindingAttributesExpand" />
            <AddProductVariantsButton
                title="ADD PRODUCTS"
                :theme="secondaryTheme">
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
                @added="onAttributeBindingAdded" />
        </template>
        <template #actionPlaceholder>
            <AddProductVariantsButton
                title="CHOOSE VARIANTS"
                @added="onProductsAttachmentUpdated" />
        </template>
    </Grid>
</template>

<script>
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    THEME,
} from '@Core/defaults/theme';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getDefaultDataFromQueryParams,
    getParams,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import BindingAttributes from '@Products/extends/components/BindingAttributes/BindingAttributes';
import AddProductVariantsButton from '@Products/extends/components/Buttons/AddProductVariantsButton';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Grid from '@UI/components/Grid/Grid';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttachedProductVariantsGrid',
    components: {
        Grid,
        ExpandNumericButton,
        BindingAttributes,
        IconAdd,
        AddProductVariantsButton,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
    ],
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
            isBindingAttributesExpanded: false,
        };
    },
    computed: {
        ...mapState('product', [
            'selectAttributes',
            'bindings',
        ]),
        gridPlaceholder() {
            return {
                title: 'No product variants',
                subtitle: 'Choose products which together will create a product with variants. You can choose between products which contain selected binding attributes.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
            };
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
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    watch: {
        $route(from, to) {
            if (from.name !== to.name) {
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

            this.onFetchData();
        },
    },
    mounted() {
        document.documentElement.addEventListener('attribute-binding-added', this.onAttributeBindingAdded);
        document.documentElement.addEventListener('products-attachment-updated', this.onProductsAttachmentUpdated);
    },
    beforeDestroy() {
        document.documentElement.removeEventListener('attribute-binding-added', this.onAttributeBindingAdded);
        document.documentElement.removeEventListener('products-attachment-updated', this.onProductsAttachmentUpdated);
    },
    methods: {
        ...mapActions('product', [
            'getProductBindings',
            'removeBinding',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        async onProductsAttachmentUpdated() {
            await this.onFetchData();
        },
        async onAttributeBindingAdded() {
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
        onRemoveRow() {
            this.onFetchData();
        },
        async onFetchData() {
            const params = getParams({
                $route: this.$route,
                $cookies: this.$cookies,
            });

            if (typeof params.filter === 'undefined') {
                params.filter = '';
            }

            if (!params.filter.includes('attached')) {
                params.filter += `;attached${FILTER_OPERATOR.EQUAL}true`;
            }

            await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `products/${this.$route.params.id}/children-and-available-products`,
                params,
                onSuccess: this.onFetchDataSuccess,
                onError: this.onFetchDataError,
            });
        },
        onFetchDataSuccess({
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
            this.rows = rows;
            this.filtered = filtered;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Product variants haven’t been fetched properly',
            });
        },
        onRemoveAllFilters() {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    filter: '',
                    page: 1,
                },
            });
        },
        onFilterChange(filters) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    page: 1,
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
