/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="horizontal-wrapper">
            <div class="tab__options">
                <VerticalTabBar :items="verticalTabs" />
            </div>
            <div class="tab__grid">
                <Grid
                    store-namespace="productsGrid"
                    :rows-height="rowsHeight"
                    :action-paths="actionPaths"
                    :editing-privilege-allowed="isUserAllowedToUpdate"
                    :advanced-filters="true"
                    title="Products" />
                <TrashCan v-show="isColumnDragging" />
            </div>
        </div>
        <GridFooter>
            <GridPageSelector
                v-model="visibleRowsInPageCount"
                :rows-number="numberOfDataElements" />
            <GridPagination
                :value="displayedPage"
                :max-page="numberOfPages"
                @input="onPageChanged" />
            <Button
                large
                title="SAVE CHANGES"
                :disabled="!isUserAllowedToUpdate"
                @click.native="saveDrafts" />
        </GridFooter>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import Grid from '~/components/Grid/Grid';
import GridFooter from '~/components/Grid/GridFooter';
import GridPageSelector from '~/components/Grid/GridPageSelector';
import GridPagination from '~/components/Grid/GridPagination';
import VerticalTabBar from '~/components/Tab/VerticalTabBar';
import TrashCan from '~/components/DragAndDrop/TrashCan';
import Button from '~/components/Buttons/Button';

export default {
    name: 'ProductGridTab',
    components: {
        Grid,
        GridFooter,
        GridPageSelector,
        GridPagination,
        VerticalTabBar,
        TrashCan,
        Button,
    },
    data() {
        return {
            verticalTabs: [
                {
                    title: 'Attributes',
                    component: () => import('~/components/Card/AttributesListTab'),
                    props: {
                        disabled: !this.$hasAccess('PRODUCT_READ'),
                    },
                    iconPath: 'Menu/IconAttributes',
                    active: true,
                },
            ],
            gridConfiguration: {
                rows: {
                    height: 32,
                },
            },
        };
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'productsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('productsGrid');
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            isColumnDragging: state => state.isColumnDragging,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('productsGrid', {
            numberOfDataElements: state => state.count,
            displayedPage: state => state.displayedPage,
            numberOfDisplayedElements: state => state.numberOfDisplayedElements,
        }),
        ...mapState('gridDraft', {
            drafts: state => state.drafts,
        }),
        ...mapGetters('productsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        isUserAllowedToUpdate() {
            return this.$hasAccess('PRODUCT_UPDATE');
        },
        actionPaths() {
            return {
                getData: `${this.userLanguageCode}/products`,
                routerEdit: 'products-edit-id',
            };
        },
        rowsHeight: {
            get() {
                const { height } = this.gridConfiguration.rows;

                return height;
            },
            set(value) {
                this.gridConfiguration.rows.height = value;
            },
        },
        visibleRowsInPageCount: {
            get() {
                return this.numberOfDisplayedElements;
            },
            set(value) {
                const number = Math.trunc(value);

                if (number !== this.numberOfDisplayedElements) {
                    this.changeNumberOfDisplayingElements({ number });
                    this.getDataWrapper();
                }
            },
        },
    },
    methods: {
        ...mapActions('productsGrid', [
            'getData',
            'addDraftToProduct',
            'changeDisplayingPage',
            'changeNumberOfDisplayingElements',
        ]),
        ...mapActions('productsDraft', [
            'applyDraft',
        ]),
        ...mapActions('gridDraft', [
            'removeDraft',
            'forceDraftsMutation',
        ]),
        onPageChanged(page) {
            this.changeDisplayingPage(page);
            this.getDataWrapper();
        },
        getDataWrapper() {
            const { getData: path } = this.actionPaths;
            this.getData(
                {
                    path,
                },
            );
        },
        saveDrafts() {
            const promises = [];

            Object.entries(this.drafts).forEach(([productId, column]) => {
                Object.entries(column).forEach(([columnId, languageCode]) => {
                    const [value] = Object.values(languageCode);

                    promises.push(this.applyDraft({
                        id: productId,
                        onSuccess: () => {
                            this.addDraftToProduct({ columnId, productId, value });
                            this.removeDraft(productId);
                        },
                    }));
                });
            });

            Promise.all(promises).then(() => {
                this.forceDraftsMutation();
            });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'productsGrid',
            store,
        });

        const gridPath = `${store.state.authentication.user.language}/products`;
        await store.dispatch('productsGrid/getData', { path: gridPath });
    },
};
</script>

<style lang="scss" scoped>
    .tab {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $white;

        .horizontal-wrapper {
            display: flex;
            flex: 1;
        }

        &__options {
            display: flex;
            margin: 24px 12px 0 24px;
        }

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 0;
            margin: 12px 12px 0 0;
            overflow: hidden;

            .filters-panel-wrapper {
                display: flex;
                justify-content: space-between;
                padding: 12px 12px 0;
            }
        }
    }
</style>
