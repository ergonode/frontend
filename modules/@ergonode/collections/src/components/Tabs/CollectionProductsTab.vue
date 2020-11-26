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
                :drafts="drafts"
                :pagination="pagination"
                :filters="filterValues"
                :collection-cell-binding="collectionCellBinding"
                :extended-components="extendedGridComponents"
                :is-editable="isAllowedToUpdate"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-border="true"
                @cell-value="onCellValueChange"
                @delete-row="onRemoveRow"
                @pagination="onPaginationChange"
                @column-sort="onColumnSortChange"
                @filter="onFilterChange"
                @remove-all-filters="onRemoveAllFilters">
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
                <template #appendFooter>
                    <Button
                        :title="$t('core.buttons.submit')"
                        @click.native="onSubmit">
                        <template
                            v-if="isSubmitting"
                            #prepend="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
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
import PRIVILEGES from '@Collections/config/privileges';
import {
    ADD_PRODUCT,
} from '@Collections/defaults';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionProductsTab',
    components: {
        CenterViewTemplate,
        ActionButton,
        IconAdd,
        IconSpinner,
        Button,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'collections/_id/elements',
        }),
        extendedGridComponentsMixin,
        tabFeedbackMixin,
    ],
    async fetch() {
        await this.onFetchData();
        this.isPrefetchingData = false;
    },
    data() {
        return {
            isSubmitting: false,
            isPrefetchingData: true,
            selectedAppModalOption: null,
        };
    },
    computed: {
        ...mapState('grid', [
            'drafts',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
            };
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
            return this.$getExtendedComponents('@Collections/components/Tabs/CollectionProductsTab/addProductFrom');
        },
        modalComponent() {
            let extendedOptions = [];

            if (this.extendedComponents.length) {
                extendedOptions = this.extendedComponents;
            }

            const modals = [
                {
                    component: () => import('@Collections/components/Modals/AddProductsBySKUModalForm'),
                    name: ADD_PRODUCT.FROM_LIST,
                },
                {
                    component: () => import('@Collections/components/Modals/AddProductsFromSegmentModalForm'),
                    name: ADD_PRODUCT.FROM_SEGMENT,
                },
                ...extendedOptions,
            ];

            return modals.find(modal => modal.name === this.selectedAppModalOption).component;
        },
    },
    methods: {
        ...mapActions('grid', [
            'setDrafts',
        ]),
        ...mapActions('collection', [
            'updateCollectionProductsVisibility',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateCollectionProductsVisibility({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        async onUpdateSuccess() {
            Object.keys(this.drafts).forEach((key) => {
                const [
                    rowId,
                ] = key.split('/');

                const row = this.rows.find(({
                    id,
                }) => id.value === rowId);

                if (row) {
                    row.visible.value = this.drafts[key];
                }
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product visibilities in collection have been updated',
            });

            this.setDrafts();

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
        onCellValueChange(cellValues) {
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

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'collectionProducts',
                value: drafts,
            });
        },
        onSelectAddProductOption(option) {
            this.selectedAppModalOption = option;
        },
        onCloseModal() {
            this.selectedAppModalOption = null;
        },
        async onCreatedData() {
            this.isPrefetchingData = true;

            await this.onFetchData();

            this.selectedAppModalOption = null;
            this.isPrefetchingData = false;
        },
    },
};
</script>
