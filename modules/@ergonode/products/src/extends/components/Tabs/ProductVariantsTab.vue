/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                v-if="bindings.length || isPrefetchingData"
                :is-editable="isAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :drafts="drafts"
                :filters="filterValues"
                :collection-cell-binding="collectionCellBinding"
                :placeholder="gridPlaceholder"
                :is-prefetching-data="isPrefetchingData"
                :is-collection-layout="true"
                :is-basic-filter="true"
                :is-header-visible="true"
                :is-border="true"
                @delete-row="onRemoveProduct"
                @fetch-data="onFetchData"
                @remove-all-filters="onRemoveAllFilters"
                @filter="onFilterChange">
                <template #actionsHeader>
                    <ExpandNumericButton
                        title="BINDING ATTRIBUTES"
                        :number="bindings.length"
                        :is-expanded="isBindingAttributesExpanded"
                        @click.native="onBindingAttributesExpand" />
                    <Button
                        title="ADD PRODUCTS"
                        :size="smallSize"
                        :disabled="!isAllowedToUpdate"
                        :theme="secondaryTheme"
                        @click.native="onShowProductsModal">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                    <AddProductsFromListModalGrid
                        v-if="isAddProductsModalVisible"
                        @close="onCloseProductsModal"
                        @submitted="onSubmittedProductVariants" />
                </template>
                <template #appendHeader>
                    <BindingAttributes
                        v-if="isBindingAttributesExpanded"
                        :attributes="bindingAttributes"
                        @remove-binding="onRemoveBinding"
                        @added="onAddedBinding" />
                </template>
                <template #actionPlaceholder>
                    <Button
                        title="CHOOSE VARIANTS"
                        :size="smallSize"
                        :disabled="!isAllowedToUpdate"
                        @click.native="onChooseVariants" />
                </template>
            </Grid>
            <ListPlaceholder
                v-else
                v-bind="listPlaceholder">
                <template #action>
                    <Button
                        title="ADD BINDING ATTRIBUTES"
                        :size="smallSize"
                        @click.native="onShowBindingAttributesModal" />
                    <AddBindingAttributesModalForm
                        v-if="isAddBindingModalVisible"
                        @close="onCloseBindingAttributesModal"
                        @created="onCreatedBindingAttributesData" />
                </template>
            </ListPlaceholder>
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import Grid from '@Core/components/Grid/Grid';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import ListPlaceholder from '@Core/components/List/ListPlaceholder';
import {
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import PRIVILEGES from '@Products/config/privileges';
import BindingAttributes from '@Products/extends/components/BindingAttributes/BindingAttributes';
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
        Button,
        ExpandNumericButton,
        BindingAttributes,
        IconAdd,
        AddProductsFromListModalGrid: () => import('@Products/extends/components/Modals/AddProductsFromListModalGrid'),
        AddBindingAttributesModalForm: () => import('@Products/extends/components/Modals/AddBindingAttributesModalForm'),
    },
    mixins: [
        gridDraftMixin,
        tabFeedbackMixin,
    ],
    data() {
        return {
            isAddBindingModalVisible: false,
            isAddProductsModalVisible: false,
            columns: [],
            rows: [],
            filtered: 0,
            filterValues: {},
            localParams: DEFAULT_GRID_FETCH_PARAMS,
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
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        listPlaceholder() {
            return {
                style: 'width: 560px; max-height: 280px; margin-top: 24px; align-self: center',
                layoutOrientation: this.horizontalOrientation,
                title: 'No binding attributes',
                subtitle: 'Binding attribute is the common attribute of the products, which link products together into the product with variants.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
            };
        },
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        smallSize() {
            return SIZE.SMALL;
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
        onFilterChange(filters) {
            this.filterValues = filters;

            this.onFetchData({
                ...this.localParams,
                filter: this.filterValues,
            });
        },
        onRemoveAllFilters() {
            this.filterValues = {};

            this.onFetchData({
                ...this.localParams,
                filter: {},
            });
        },
        onShowBindingAttributesModal() {
            this.isAddBindingModalVisible = true;
        },
        onCloseBindingAttributesModal() {
            this.isAddBindingModalVisible = false;
        },
        onShowProductsModal() {
            this.isAddProductsModalVisible = true;
        },
        async onCloseProductsModal() {
            this.isAddProductsModalVisible = false;
        },
        async onSubmittedProductVariants() {
            this.isPrefetchingData = true;

            await this.onFetchData();

            this.isPrefetchingData = false;
        },
        async onCreatedBindingAttributesData() {
            this.onCloseBindingAttributesModal();

            await this.onAddedBinding();
        },
        async onAddedBinding() {
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
        onChooseVariants() {
            this.isBindingAttributesExpanded = true;
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
            let filtersWithAttached = filter;

            if (!filter.includes('attached=true')) {
                filtersWithAttached = 'attached=true';
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

            const {
                columns,
                rows,
                filtered,
            } = await getGridData({
                $axios: this.$axios,
                path: `products/${this.id}/children-and-available-products`,
                params: this.localParams,
            });

            this.columns = columns.map(column => ({
                ...column,
                editable: false,
            }));
            this.filtered = filtered;
            this.rows = rows;
        },
    },
};
</script>
