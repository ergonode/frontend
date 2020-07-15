/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['PRODUCT_COLLECTION_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :collection-cell-binding="collectionCellBinding"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-centered-view="true"
                @deleteRow="onRemoveRow"
                @fetchData="getGridData">
                <template #actions>
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
import {
    ADD_PRODUCT,
} from '@Collections/defaults';
import ActionButton from '@Core/components/Buttons/ActionButton';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import {
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
    data() {
        return {
            selectedAppModalOption: null,
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                'PRODUCT_COLLECTION_UPDATE',
            ]);
        },
        collectionCellBinding() {
            return {
                imageColumn: `esa_default_image:${this.languageCode}`,
                descriptionColumn: `esa_default_label:${this.languageCode}`,
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        addProductOptions() {
            return Object.values(ADD_PRODUCT);
        },
        modalComponent() {
            switch (this.selectedAppModalOption) {
            // TODO: We may delay this functionality - selecting from Grid might product performance issues - need planning
            // case ADD_PRODUCT.FROM_LIST:
            //     return () => import('@Collections/components/Modals/AddProductsFromListModalGrid');
            case ADD_PRODUCT.FROM_SEGMENT:
                return () => import('@Collections/components/Modals/AddProductsFromSegmentModalForm');
            case ADD_PRODUCT.BY_SKU:
                return () => import('@Collections/components/Modals/AddProductsBySKUModalForm');
            default: return null;
            }
        },
    },
    methods: {
        onSelectAddProductOption(option) {
            this.selectedAppModalOption = option;
        },
        onCloseModal() {
            this.selectedAppModalOption = null;
        },
        onCreatedData() {
            this.getGridData(this.localParams);
            this.selectedAppModalOption = null;
        },
    },
};
</script>
