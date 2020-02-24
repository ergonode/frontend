/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar
                :items="verticalTabs"
                @select="onSelectTabBarItem" />
        </template>
        <template #grid>
            <Grid
                :editing-privilege-allowed="isUserAllowedToUpdate"
                :columns="columns"
                :advanced-filters="advancedFilters"
                :data-count="filtered"
                :cell-values="cellValues"
                :row-ids="rowIds"
                :row-links="rowLinks"
                :is-header-visible="true"
                :is-basic-filters="true"
                :is-draggable="true"
                :is-edit-column="true"
                :is-select-column="true"
                @editRow="onEditRow"
                @swapColumns="swapColumnsPosition"
                @insertColumn="insertColumnAtIndex"
                @removeColumn="removeColumnAtIndex"
                @dropColumn="dropColumnAtIndex"
                @insertFilter="insertFilterAtIndex"
                @setGhostFilter="setGhostFilterAtIndex"
                @removeFilter="removeFilterAtIndex"
                @updateFilter="updateFilterValueAtIndex"
                @clearFilter="clearFilterAtIndex"
                @swapFilters="swapFiltersPosition"
                @removeAllFilters="removeAllFilters"
                @clearAllFilters="clearAllFilters"
                @dropFilter="dropFilterAtIndex"
                @fetchData="getGridData">
                <template #appendFooter>
                    <Button
                        title="SAVE CHANGES"
                        :size="smallSize"
                        :disabled="!isUserAllowedToUpdate || $isLoading('footerDraftButton')"
                        @click.native="saveDrafts" />
                </template>
            </Grid>
        </template>
    </GridViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Button from '@Core/components/Buttons/Button';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import gridDataMixin from '@Core/mixins/grid/gridDataMixin';
import { SIZES } from '@Core/defaults/buttons';

export default {
    name: 'ProductGridTab',
    components: {
        GridViewTemplate,
        Button,
        VerticalTabBar: () => import('@Core/components/Tab/VerticalTabBar'),
        Grid: () => import('@Core/components/Grid/Grid'),
    },
    mixins: [gridDataMixin({ path: 'products' })],
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('gridDraft', {
            drafts: state => state.drafts,
        }),
        smallSize() {
            return SIZES.SMALL;
        },
        verticalTabs() {
            const isUserAllowedToReadProduct = this.$hasAccess(['PRODUCT_READ']);
            return [
                {
                    title: 'Product attributes',
                    component: () => import('@Attributes/components/Tabs/List/AttributesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconAttributes'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                    listDataType: 'attributes',
                },
                {
                    title: 'System attributes',
                    component: () => import('@Attributes/components/Tabs/List/SystemAttributesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconSettings'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                    listDataType: 'attributes/system',
                },
            ];
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'applyDraft',
        ]),
        ...mapActions('list', [
            'getElements',
        ]),
        ...mapActions('gridDraft', [
            'removeDraft',
            'forceDraftsMutation',
        ]),
        onSelectTabBarItem(index) {
            const { listDataType } = this.verticalTabs[index];

            this.getElements({
                listType: listDataType,
                languageCode: this.userLanguageCode,
            });
        },
        onEditRow({ links: { value: { edit } } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'product-id-general', params: { id: args[lastIndex] } });
        },
        saveDrafts() {
            const promises = [];

            Object.keys(this.drafts).forEach((productId) => {
                promises.push(this.applyDraft({
                    id: productId,
                    onSuccess: () => {
                        Object.keys(this.drafts[productId]).forEach((columnId) => {
                            this.cellValues[productId][columnId] = this.drafts[productId][columnId];
                        });
                        this.removeDraft(productId);
                    },
                }));
            });

            Promise.all(promises).then(() => {
                this.forceDraftsMutation();
                this.$addAlert({ type: 'success', message: 'Product changes saved' });
            });
        },
    },
};
</script>
