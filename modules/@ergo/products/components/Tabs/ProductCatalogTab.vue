/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs" />
        </template>
        <template #grid>
            <Grid
                :is-editable="isUserAllowedToUpdate"
                :columns="columns"
                :data="data"
                :advanced-filters="advancedFilters"
                :data-count="filtered"
                :collection-cell-binding="collectionCellBinding"
                :is-advanced-filters="true"
                :is-header-visible="true"
                :is-basic-filter="true"
                :is-collection-layout="true"
                @editRow="onEditRow"
                @editCell="onEditCell"
                @editCells="onEditCells"
                @focusCell="onFocusCell"
                @removeRow="onRemoveRow"
                @dropColumn="onDropColumn"
                @removeFilter="removeFilterAtIndex"
                @updateFilter="updateFilterValueAtIndex"
                @clearFilter="clearFilterAtIndex"
                @swapFilters="swapFiltersPosition"
                @removeAllFilters="removeAllFilters"
                @dropFilter="dropFilter"
                @fetchData="getGridData">
                <template #actions>
                    <!--
                      Uncomment when product draft will be change on grid
                      <Button
                        :theme="secondaryTheme"
                        :size="smallSize"
                        title="RESTORE"
                        :disabled="!isUserAllowedToRestore"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconRestore :fill-color="color" />
                        </template>
                    </Button> -->
                    <!-- <RestoreAttributeParentModalConfirm
                        v-if="isModalVisible"
                        :element="focusedCellToRestore"
                        @close="onCloseConfirmModal"
                        @restore="onRestoreDraftSuccess" /> -->
                </template>
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
// import getProductDraft from '@Products/services/getProductDraft.service';
import Button from '@Core/components/Buttons/Button';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

const updateProductDraft = () => import('@Products/services/updateProductDraft.service');

export default {
    name: 'ProductCatalogTab',
    components: {
        GridViewTemplate,
        Button,
        VerticalTabBar: () => import('@Core/components/TabBar/VerticalTabBar'),
        // RestoreAttributeParentModalConfirm: () => import('@Products/components/Modals/RestoreAttributeParentModalConfirm'),
        // IconRestore: () => import('@Core/components/Icons/Actions/IconRestore'),
    },
    mixins: [
        gridModalMixin,
        fetchGridDataMixin({
            path: 'products',
        }),
    ],
    data() {
        return {
            focusedCellToRestore: null,
        };
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        collectionCellBinding() {
            return {
                imageColumn: `esa_default_image:${this.userLanguageCode}`,
                descriptionColumn: `esa_default_label:${this.userLanguageCode}`,
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        verticalTabs() {
            const isUserAllowedToReadProduct = this.$hasAccess([
                'PRODUCT_READ',
            ]);
            return [
                {
                    title: 'Product attributes',
                    component: () => import('@Attributes/components/Tabs/List/AttributesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconAttributes'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                },
                {
                    title: 'System attributes',
                    component: () => import('@Attributes/components/Tabs/List/SystemAttributesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconSettings'),
                    props: {
                        disabled: !isUserAllowedToReadProduct,
                    },
                },
            ];
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                'PRODUCT_UPDATE',
            ]);
        },
        isUserAllowedToRestore() {
            return this.$hasAccess([
                'PRODUCT_UPDATE',
            ]) && this.focusedCellToRestore;
        },
    },
    methods: {
        ...mapActions('product', [
            'applyDraft',
            'getProductDraft',
        ]),
        ...mapActions('grid', [
            'removeDraftRow',
        ]),
        onEditCell({
            rowId, columnId, value,
        }) {
            const {
                element_id,
            } = this.columns.find(column => column.id === columnId);

            updateProductDraft().then(response => response.default({
                $axios: this.$axios,
                $store: this.$store,
                fieldKey: `${rowId}/${columnId}`,
                languageCode: columnId.split(':')[1],
                productId: rowId,
                elementId: element_id,
                value,
            }));
        },
        onEditCells(editedCells) {
            const cachedElementIds = {};

            const requests = editedCells.map(({
                rowId, columnId, value,
            }) => {
                if (!cachedElementIds[columnId]) {
                    const {
                        element_id,
                    } = this.columns.find(column => column.id === columnId);

                    cachedElementIds[columnId] = element_id;
                }

                return updateProductDraft().then(response => response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                    fieldKey: `${rowId}/${columnId}`,
                    languageCode: columnId.split(':')[1],
                    productId: rowId,
                    elementId: cachedElementIds[columnId],
                    value,
                }));
            });

            Promise.all(requests);
        },
        onFocusCell({
            column, rowId,
        }) {
            if (column) {
                if (rowId && column.element_id) {
                    this.focusedCellToRestore = {
                        languageCode: column.language,
                        attribute: column,
                        productId: rowId,
                    };
                } else {
                    this.focusedCellToRestore = null;
                }
            } else {
                this.focusedCellToRestore = null;
            }
        },
        onCloseConfirmModal() {
            this.focusedCellToRestore = null;
            this.onCloseModal();
        },
        // async onRestoreDraftSuccess({ languageCode, productId, attribute }) {
        //     const { attributes } = await getProductDraft({
        //         $axios: this.$axios,
        //         languageCode,
        //         id: productId,
        //     });
        //     const [attributeKey] = attribute.id.split(':');
        //     const restoredValue = attributes[attributeKey] || null;
        // },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'product-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
        async saveDrafts() {
            const promises = [];

            Object.keys(this.drafts).forEach((rowId) => {
                promises.push(this.applyDraft({
                    id: rowId,
                    onSuccess: () => this.removeDraftRow(rowId),
                }));
            });

            await this.$setLoader('footerDraftButton');
            await Promise.all(promises).then(() => {
                this.getGridData(this.localParams);
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: 'Product changes saved',
                });
            });
            await this.$removeLoader('footerDraftButton');
        },
    },
};
</script>
