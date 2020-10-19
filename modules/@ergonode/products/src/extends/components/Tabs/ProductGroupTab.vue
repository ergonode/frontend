/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :is-editable="isAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :drafts="drafts"
                :collection-cell-binding="collectionCellBinding"
                :is-prefetching-data="isPrefetchingData"
                :is-collection-layout="true"
                :is-basic-filter="true"
                :is-header-visible="true"
                :is-border="true"
                @delete-row="onRemoveProduct"
                @fetch-data="onFetchData">
                <template #headerActions>
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
import ActionButton from '@Core/components/ActionButton/ActionButton';
import Button from '@Core/components/Button/Button';
import Grid from '@Core/components/Grid/Grid';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
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
import {
    ADD_PRODUCT,
} from '@Products/defaults';
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
        tabFeedbackMixin,
    ],
    data() {
        return {
            columns: [],
            rows: [],
            filtered: 0,
            selectedAppModalOption: null,
            isPrefetchingData: false,
            localParams: DEFAULT_GRID_FETCH_PARAMS,
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

            this.extendedComponents.forEach((option) => {
                options.push(option.name);
            });
            return options;
        },
        extendedComponents() {
            return this.$getExtendedComponents('@Products/components/Tabs/ProductGroupTab/addFromSegment');
        },
        modalComponent() {
            const modals = [
                {
                    component: () => import('@Products/extends/components/Modals/AddProductsFromListModalGrid'),
                    name: ADD_PRODUCT.FROM_LIST,
                },
                ...this.extendedComponents,
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

            this.columns = columns.map((column) => {
                if (column.id === 'attached') {
                    return {
                        ...column,
                        filter: null,
                        editable: false,
                    };
                }

                return {
                    ...column,
                    editable: false,
                };
            });
            this.filtered = filtered;
            this.rows = rows;
        },
    },
};
</script>
