/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="isUserAllowedToUpdate"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :drafts="drafts"
                :collection-cell-binding="collectionCellBinding"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-border="true"
                @cellValue="onCellValueChange"
                @deleteRow="onRemoveRow"
                @fetchData="onFetchData">
                <template #headerActions>
                    <ActionButton
                        title="ADD PRODUCTS"
                        :theme="secondaryTheme"
                        :disabled="!isUserAllowedToUpdate"
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
                @added="onCreatedData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import {
    ADD_PRODUCT,
    EXTENDS,
} from '@Collections/defaults';
import ActionButton from '@Core/components/ActionButton/ActionButton';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionProductsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ActionButton,
        IconAdd,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'collections/_id/elements',
        }),
    ],
    async fetch() {
        await this.onFetchData();
        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
            selectedAppModalOption: null,
        };
    },
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        isUserAllowedToUpdate() {
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

            this.extendedComponents.forEach((option) => {
                options.push(option.name);
            });
            return options;
        },
        extendedComponents() {
            return this.$getExtendedComponents(EXTENDS.COLLECTIONS_ADD_PRODUCTS);
        },
        modalComponent() {
            const modals = [
                {
                    component: () => import('@Collections/components/Modals/AddProductsBySKUModalForm'),
                    name: ADD_PRODUCT.BY_SKU,
                },
                ...this.extendedComponents,
            ];

            return modals.find(modal => modal.name === this.selectedAppModalOption).component;
        },
    },
    methods: {
        ...mapActions('grid', [
            'setDrafts',
        ]),
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
        },
        onSelectAddProductOption(option) {
            this.selectedAppModalOption = option;
        },
        onCloseModal() {
            this.selectedAppModalOption = null;
        },
        onCreatedData() {
            this.onFetchData(this.localParams);
            this.selectedAppModalOption = null;
        },
    },
};
</script>
