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
                    namespace="productsGrid"
                    :route-edit="routeEdit"
                    :editing-privilege-allowed="isUserAllowedToUpdate"
                    :advanced-filters="true"
                    :basic-filters="true"
                    title="Products"
                    @rowEdit="onRowEdit" />
            </div>
        </div>
        <GridFooter>
            <GridPageSelector
                v-model="visibleRowsInPageCount"
                :rows-number="numberOfDataElements" />
            <GridPagination
                :value="currentPage"
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
import Button from '~/components/Buttons/Button';

export default {
    name: 'ProductGridTab',
    components: {
        Grid,
        GridFooter,
        GridPageSelector,
        GridPagination,
        VerticalTabBar,
        Button,
    },
    data() {
        return {
            verticalTabs: [
                {
                    title: 'Attributes',
                    component: () => import('~/components/Card/Lists/AttributesListTab'),
                    props: {
                        disabled: !this.$hasAccess('PRODUCT_READ'),
                    },
                    iconPath: 'Menu/IconAttributes',
                    active: true,
                },
            ],
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
            isListElementDragging: (state) => state.isListElementDragging,
        }),
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('productsGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapState('gridDraft', {
            drafts: (state) => state.drafts,
        }),
        ...mapGetters('productsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        isUserAllowedToUpdate() {
            return this.$hasAccess('PRODUCT_UPDATE');
        },
        routeEdit() {
            return {
                getData: `${this.userLanguageCode}/products`,
                name: 'product-edit-id',
            };
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
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        ...mapActions('productsDraft', [
            'applyDraft',
        ]),
        ...mapActions('gridDraft', [
            'removeDraft',
            'forceDraftsMutation',
        ]),
        onRowEdit({ links: { edit } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'product-edit-id-general', params: { id: args[lastIndex] } });
        },
        onPageChanged(page) {
            this.setCurrentPage(page);
            this.getDataWrapper();
        },
        getDataWrapper() {
            const { getData: path } = this.routeEdit;
            this.getData(
                {
                    path,
                },
            );
        },
        saveDrafts() {
            const promises = [];

            Object.keys(this.drafts).forEach((productId) => {
                promises.push(this.applyDraft({
                    id: productId,
                    onSuccess: () => {
                        Object.entries(this.drafts[productId])
                            .forEach(([columnId, languageCode]) => {
                                const [value] = Object.values(languageCode);

                                this.addDraftToProduct({ columnId, productId, value });
                                this.removeDraft(productId);
                            });
                    },
                }));
            });

            Promise.all(promises).then(() => {
                this.forceDraftsMutation();
                this.$addAlert({ type: 'success', message: 'Product changes saved' });
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
            margin: 24px 24px 0;
        }

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 0;
            margin: 24px 24px 0 0;
            overflow: hidden;
        }
    }
</style>
