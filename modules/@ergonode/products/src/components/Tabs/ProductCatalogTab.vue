/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <RemoveFilterAndColumnDropZone />
            </VerticalTabBar>
        </template>
        <template #grid>
            <Grid
                :columns="columns"
                :rows="rows"
                :placeholder="noDataPlaceholder"
                :drafts="drafts"
                :filters="filterValues"
                :errors="errors"
                :data-count="filtered"
                :collection-cell-binding="collectionCellBinding"
                :batch-actions="productsBatchActions"
                :disabled-rows="disabledProducts"
                :extended-columns="extendedColumns"
                :extended-data-cells="extendedDataCells"
                :extended-data-filter-cells="extendedDataFilterCells"
                :extended-data-edit-cells="extendedDataEditCells"
                :extended-edit-filter-cells="extendedDataEditFilterCells"
                :is-editable="isAllowedToUpdate"
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-basic-filter="true"
                :is-collection-layout="true"
                :is-select-column="true"
                @edit-row="onEditRow"
                @preview-row="onEditRow"
                @cell-value="onCellValueChange"
                @filter="onFilterChange"
                @delete-row="onRemoveRow"
                @drop-column="onDropColumn"
                @remove-column="onRemoveColumn"
                @swap-columns="onSwapColumns"
                @fetch-data="onFetchData"
                @remove-all-filters="onRemoveAllFilters">
                <template #actionsHeader>
                    <ExpandNumericButton
                        title="FILTERS"
                        :number="advancedFilters.length"
                        :is-expanded="isFiltersExpanded"
                        @click.native="onFiltersExpand" />
                    <template
                        v-for="(headerItem, index) in extendedActionHeader">
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
                    <GridAdvancedFilters
                        v-show="isFiltersExpanded"
                        :value="advancedFilterValues"
                        :filters="advancedFilters"
                        @swap="onAdvancedFilterPositionChange"
                        @remove="onAdvancedFilterRemove"
                        @remove-all="onAdvancedFilterRemoveAll"
                        @input="onAdvancedFilterChange" />
                </template>
                <template #filterActionPlaceholder>
                    <RemoveFiltersButton
                        v-if="isAnyFilter"
                        @click.native="onRemoveAllFilters" />
                </template>
                <template #appendFooter>
                    <template
                        v-for="(footerItem, index) in extendedFooter">
                        <Component
                            :is="footerItem.component"
                            :key="index"
                            v-bind="bindingProps(footerItem)" />
                    </template>
                    <Button
                        title="SAVE CHANGES"
                        :disabled="!isAllowedToUpdate"
                        @click.native="onSubmit">
                        <template
                            v-if="isSubmitting"
                            #prepend="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </Grid>
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import fetchAdvancedFiltersDataMixin from '@Core/mixins/grid/fetchAdvancedFiltersDataMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    changeCookiePosition,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import PRIVILEGES from '@Products/config/privileges';
import {
    BATCH_ACTION_TYPE,
} from '@Products/models/batchActions';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import RemoveFiltersButton from '@UI/components/Grid/Buttons/RemoveFiltersButton';
import AddFilterDropZone from '@UI/components/Grid/DropZone/AddFilterDropZone';
import RemoveFilterAndColumnDropZone from '@UI/components/Grid/DropZone/RemoveFilterAndColumnDropZone';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductCatalogTab',
    components: {
        AddFilterDropZone,
        RemoveFilterAndColumnDropZone,
        GridViewTemplate,
        Button,
        VerticalTabBar,
        IconSpinner,
        RemoveFiltersButton,
    },
    mixins: [
        gridModalMixin,
        fetchGridDataMixin({
            path: 'products',
            defaultColumns: 'index,sku,_links,esa_default_image,esa_default_label',
        }),
        fetchAdvancedFiltersDataMixin({
            path: 'products',
        }),
        gridDraftMixin,
        extendedGridComponentsMixin,
        tabFeedbackMixin,
    ],
    async fetch() {
        const requests = [
            this.onFetchData(),
        ];
        const advFiltersIds = this.$cookies.get(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

        if (advFiltersIds) {
            requests.push(this.onFetchAdvancedFilters(advFiltersIds));
        }

        await Promise.all(requests);

        this.isPrefetchingData = false;

        this.setDisabledElements(this.getDisabledElements({
            columns: this.columns,
            filters: this.advancedFilters,
        }));
    },
    data() {
        return {
            isPrefetchingData: true,
            isSubmitting: false,
            isDeleteModalVisible: false,
            extendVerticalTabs: [],
            disabledProducts: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('batchAction', {
            batchActions: state => state.batchActions,
            removeProductsBatchActions: state => state.batchActions.filter(
                batchAction => batchAction.type === BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
            ),
        }),
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        extendedActionHeader() {
            return this.$getExtendedComponents('@Products/components/Tabs/ProductCatalogTab/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendedComponents('@Products/components/Tabs/ProductCatalogTab/footer');
        },
        productsBatchActions() {
            return [
                {
                    label: 'Delete selected rows',
                    action: ({
                        payload,
                        onSuccess,
                    }) => {
                        const {
                            rowIds,
                        } = payload;

                        this.$confirm({
                            type: MODAL_TYPE.DESTRUCTIVE,
                            title: `Are you sure you want to permanently delete ${rowIds.length} products?`,
                            subtitle: 'The products will be deleted from the system forever and cannot be restored.',
                            applyTitle: `DELETE ${rowIds.length} PRODUCTS`,
                            action: () => {
                                const uuid = getUUID();

                                rowIds.forEach((rowId) => {
                                    this.disabledProducts[rowId] = true;
                                });

                                this.disabledProducts = {
                                    ...this.disabledProducts,
                                };

                                this.addBatchAction({
                                    id: uuid,
                                    type: BATCH_ACTION_TYPE.REMOVE_PRODUCTS,
                                    href: 'batch-action',
                                    payload: {
                                        ids: rowIds,
                                    },
                                });

                                document
                                    .documentElement
                                    .addEventListener(
                                        uuid,
                                        this.onRemoveProductsBatchAction.bind(null, onSuccess),
                                    );
                            },
                        });
                    },
                },
            ];
        },
        isAnyFilter() {
            return this.filtered === 0
                && (Object.keys(this.filterValues).length > 0
                    || Object.keys(this.advancedFilterValues).length > 0);
        },
        noDataPlaceholder() {
            if (this.filtered === 0 && this.isAnyFilter) {
                return {
                    title: 'No results',
                    subtitle: 'There are no results that meet the conditions for the selected filters.',
                    bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                    color: WHITESMOKE,
                };
            }

            return {
                title: 'No products',
                subtitle: 'There are no products in the system, you can create the first one.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        collectionCellBinding() {
            return {
                imageColumn: 'esa_default_image',
                descriptionColumn: 'esa_default_label',
            };
        },
        verticalTabs() {
            return [
                {
                    title: 'Product attributes',
                    component: () => import('@Attributes/components/Tabs/List/AttributesListTab'),
                    icon: () => import('@Attributes/components/Icons/IconAttributes'),
                    props: {},
                },
                {
                    title: 'System attributes',
                    component: () => import('@Attributes/components/Tabs/List/SystemAttributesListTab'),
                    icon: () => import('@Core/components/Icons/Menu/IconSettings'),
                    props: {},
                },
                ...this.extendVerticalTabs,
            ];
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    async mounted() {
        const extendVerticalTabs = await this.$extendMethods('@Products/components/Tabs/ProductCatalogTab/verticalTabs', {
            $this: this,
        });

        this.extendVerticalTabs = [
            ...this.extendVerticalTabs,
            ...extendVerticalTabs,
        ];

        this.removeProductsBatchActions.forEach(({
            id,
        }) => {
            document
                .documentElement
                .addEventListener(id, this.onRemoveProductsBatchAction);
        });
    },
    beforeDestroy() {
        this.removeProductsBatchActions.forEach(({
            id,
        }) => {
            document
                .documentElement
                .removeEventListener(id, this.onRemoveProductsBatchAction);
        });
    },
    methods: {
        ...mapActions('batchAction', [
            'addBatchAction',
            'removeBatchAction',
        ]),
        ...mapActions('list', [
            'setDisabledElement',
            'setDisabledElements',
            'removeDisabledElement',
        ]),
        ...mapActions('product', [
            'updateProductDraft',
            'applyProductDraft',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        async onRemoveProductsBatchAction(onSuccess = () => {}, event) {
            await onSuccess();

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been removed',
            });

            const {
                id,
                payload: {
                    ids,
                },
            } = event.detail;

            const batchActionIndex = this.batchActions
                .findIndex(batchAction => batchAction.id === id);

            ids.forEach((rowId) => {
                delete this.disabledProducts[rowId];
            });

            this.disabledProducts = {
                ...this.disabledProducts,
            };

            document
                .documentElement
                .removeEventListener(id, this.onRemoveProductsBatchAction);
            this.removeBatchAction(batchActionIndex);

            await this.onFetchData();
        },
        onRemoveAllFilters() {
            this.filterValues = {};
            this.advancedFilterValues = {};

            this.onFetchData({
                ...this.localParams,
                filter: {},
            });
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
        onAdvancedFilterChange(payload) {
            this.advancedFilterValues = payload;

            this.onFetchData({
                ...this.localParams,
                filter: {
                    ...this.filterValues,
                    ...this.advancedFilterValues,
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

            this.onFetchData({
                ...this.localParams,
                filter: {
                    ...this.filterValues,
                    ...this.advancedFilterValues,
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

            this.advancedFilterValues = {};
            this.advancedFilters = [];

            this.onFetchData({
                ...this.localParams,
                filter: this.filterValues,
            });
        },
        onFilterChange(filters) {
            this.filterValues = filters;

            this.onFetchData({
                ...this.localParams,
                filter: {
                    ...this.filterValues,
                    ...this.advancedFilterValues,
                },
            });
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
                rowId, columnId, value,
            }) => {
                if (!cachedElementIds[columnId]) {
                    const {
                        element_id,
                    } = this.columns.find(column => column.id === columnId);

                    cachedElementIds[columnId] = element_id;
                }

                await this.updateProductDraft({
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
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'product-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
        async onSubmit() {
            this.isSubmitting = true;

            const promises = [];

            const cachedRows = {};

            Object.keys(this.drafts).forEach((key) => {
                const [
                    rowId,
                ] = key.split('/');

                if (typeof cachedRows[rowId] === 'undefined') {
                    cachedRows[rowId] = true;

                    promises.push(this.applyProductDraft({
                        id: rowId,
                    }).then(() => this.removeDraftRow(rowId)));
                }
            });

            await Promise.all(promises);

            await this.onFetchData(this.localParams);

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        getDisabledElements({
            columns,
            filters,
        }) {
            const disabledElements = {};

            const elements = [
                ...columns.map(column => ({
                    languageCode: column.language,
                    attributeId: column.element_id,
                })),
                ...filters.map(filter => ({
                    languageCode: filter.languageCode,
                    attributeId: filter.attributeId,
                })),
            ];

            elements.forEach((element) => {
                if (element.attributeId) {
                    const {
                        attributeId,
                        languageCode = this.userLanguageCode,
                    } = element;

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
    },
};
</script>
