/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template
            #content
            v-if="filtered > 0">
            <Grid
                :is-editable="$hasAccess(['PRODUCT_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :data="data"
                :collection-cell-binding="{
                    imageColumn: 'default_image',
                    descriptionColumn: 'default_label'
                }"
                :is-collection-layout="true"
                :is-header-visible="true"
                :is-centered-view="true"
                :is-basic-filter="true"
                @removeRow="onRemoveRow"
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
        <template
            #centeredContent
            v-else>
            <ListPlaceholder
                title="Nothing to see here"
                subtitle="Here you can manage the product variants"
                :layout-orientation="horizontalOrientation"
                :bg-url="require('@Core/assets/images/placeholders/comments.svg')">
                <template #append>
                    <ActionButton
                        class="add-products-button"
                        title="ADD PRODUCTS"
                        :theme="primaryTheme"
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
            </ListPlaceholder>
            <Component
                v-if="selectedAppModalOption"
                :is="modalComponent"
                @close="onCloseModal"
                @added="onCreatedData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { ADD_PRODUCT } from '@Products/defaults';
import { LAYOUT_ORIENTATION } from '@Core/defaults/layout';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import ActionButton from '@Core/components/Buttons/ActionButton';

export default {
    name: 'ProductGroupTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ActionButton,
        IconAdd,
        ListPlaceholder: () => import('@Core/components/List/ListPlaceholder'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    mixins: [fetchGridDataMixin({ path: 'products/_id/children' })],
    data() {
        return {
            selectedAppModalOption: null,
        };
    },
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        primaryTheme() {
            return THEME.PRIMARY;
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
            //     return null;
            case ADD_PRODUCT.FROM_SEGMENT:
                return () => import('@Products/components/Modals/AddProductsFromSegmentModalForm');
            case ADD_PRODUCT.BY_SKU:
                return () => import('@Products/components/Modals/AddProductsBySKUModalForm');
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

<style lang="scss" scoped>
    .add-products-button {
        margin-top: 16px;
    }
</style>
