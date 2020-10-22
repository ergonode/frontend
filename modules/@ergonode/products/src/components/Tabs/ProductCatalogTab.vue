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
                :is-editable="isAllowedToUpdate"
                :columns="columns"
                :rows="rows"
                :placeholder="noDataPlaceholder"
                :drafts="drafts"
                :filters="filterValues"
                :errors="errors"
                :data-count="filtered"
                :collection-cell-binding="collectionCellBinding"
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
                @fetch-data="onFetchData"
                @remove-all-filter="onRemoveAllFilters">
                <template #actionsHeader>
                    <ExpandNumericButton
                        title="FILTERS"
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
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import RemoveFiltersButton from '@Core/components/Grid/Buttons/RemoveFiltersButton';
import AddFilterDropZone from '@Core/components/Grid/DropZone/AddFilterDropZone';
import RemoveFilterAndColumnDropZone from '@Core/components/Grid/DropZone/RemoveFilterAndColumnDropZone';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@Core/components/TabBar/VerticalTabBar';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import fetchAdvancedFiltersDataMixin from '@Core/mixins/grid/fetchAdvancedFiltersDataMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    changeCookiePosition,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import PRIVILEGES from '@Products/config/privileges';
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
        };
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
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
                    bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
                    color: WHITESMOKE,
                };
            }

            return {
                title: 'No products',
                subtitle: 'There are no products in the system, you can create the first one.',
                bgUrl: require('@Core/assets/images/placeholders/comments.svg'),
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
                    iconComponent: () => import('@Core/components/Icons/Menu/IconAttributes'),
                    props: {},
                },
                {
                    title: 'System attributes',
                    component: () => import('@Attributes/components/Tabs/List/SystemAttributesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconSettings'),
                    props: {},
                },
            ];
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
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
            this.advancedFilterValues = {};
            this.advancedFilters = [];

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
                const {
                    attributeId,
                    languageCode,
                } = element;

                if (attributeId && languageCode) {
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
    },
};
</script>
