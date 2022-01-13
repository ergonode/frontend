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
        :sort-order="sortOrder"
        :filters="filterValues"
        :collection-cell-binding="collectionCellBinding"
        :pagination="pagination"
        :extended-components="extendedGridComponents"
        :layout="layout"
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
                :title="$t('@Products.productExtend.components.AttachedProductVariantsGrid.bindingAttributesButtonTitle')"
                :number="bindings.length"
                :is-expanded="isBindingAttributesExpanded"
                @click.native="onBindingAttributesExpand" />
            <AddProductVariantsButton
                :title="$t('@Products._.addProducts.title')"
                :theme="secondaryTheme">
                <template #prepend="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </AddProductVariantsButton>
        </template>
        <template #noDataPlaceholder>
            <GridNoDataPlaceholder
                :title="$t('@Products.productExtend.components.AttachedProductVariantsGrid.noProductVariants')"
                :subtitle="$t('@Products.productExtend.components.AttachedProductVariantsGrid.addProductVariants')">
                <template #action>
                    <AddProductVariantsButton :title="$t('@Products.productExtend.components.AttachedProductVariantsGrid.chooseVariants')">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </AddProductVariantsButton>
                </template>
            </GridNoDataPlaceholder>
        </template>
        <template #appendHeader>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <BindingAttributes
                v-if="isBindingAttributesExpanded"
                :attributes="bindingAttributes"
                :disabled="rows.length > 0"
                @remove-binding="onRemoveBinding"
                @added="onAttributeBindingAdded" />
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
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    THEME,
} from '@Core/defaults/theme';
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getDefaultDataFromQueryParams,
    getFilterQueryParams,
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
    ATTRIBUTE_BINDING_ADDED_EVENT_NAME,
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Products/extends/defaults';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttachedProductVariantsGrid',
    components: {
        ExpandNumericButton,
        BindingAttributes,
        AddProductVariantsButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Products/extends/components/Grids/AttachedProductVariantsGrid/props',
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
            layout: GRID_LAYOUT.TABLE,
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
        extendedActionHeader() {
            return this.$getExtendSlot('@Products/components/Grids/AttachedProductVariantsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Products/components/Grids/AttachedProductVariantsGrid/footer');
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
    mounted() {
        document.documentElement.addEventListener(
            ATTRIBUTE_BINDING_ADDED_EVENT_NAME,
            this.onAttributeBindingAdded,
        );
        document.documentElement.addEventListener(
            PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
            this.onProductsAttachmentUpdated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            ATTRIBUTE_BINDING_ADDED_EVENT_NAME,
            this.onAttributeBindingAdded,
        );
        document.documentElement.removeEventListener(
            PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
            this.onProductsAttachmentUpdated,
        );
    },
    methods: {
        ...mapActions('product', [
            'getProductBindings',
            'removeBinding',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onLayoutChange(layout) {
            this.layout = layout;
        },
        async onProductsAttachmentUpdated() {
            await this.onFetchData();
        },
        async onAttributeBindingAdded() {
            this.isPrefetchingData = true;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
        async onRemoveBinding(index) {
            this.isPrefetchingData = true;

            await this.removeBinding(index);
            await this.onFetchData();

            this.isPrefetchingData = false;
        },
        onBindingAttributesExpand() {
            this.isBindingAttributesExpanded = !this.isBindingAttributesExpanded;
        },
        onRemoveRow() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.productExtend.components.AttachedProductVariantsGrid.deleteSuccess'),
            });
            this.onFetchData();
        },
        async onFetchData() {
            const params = getParams({
                $route: this.$route,
                $cookies: this.$gridCookies,
                layout: this.layout,
            });

            if (typeof params.filter === 'undefined') {
                params.filter = '';
            }

            if (!params.filter.includes('attached')) {
                params.filter += `;attached${FILTER_OPERATOR.EQUAL}true`;
            }

            params.columns = this.bindingAttributes.map(attribute => attribute.key).join(',');

            await getGridData({
                $cookies: this.$gridCookies,
                layout: this.layout,
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
                message: this.$t('@Products.productExtend.components.AttachedProductVariantsGrid.getRequest'),
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
