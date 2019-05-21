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
                <!-- NOTE: Uncomment when filters are implemented -->
                <!--<GridGlobalFilters v-show="isGlobalFiltersVisible" />-->
                <div class="filters-panel-wrapper">
                    <GridFilterActions
                        v-model="filtersExpanded"
                        :filters-number="filtersNumber" />
                    <GridLayoutConfigurator v-model="rowsHeight" />
                </div>
                <GridWrapper
                    :rows-height="rowsHeight"
                    :action-paths="actionPaths" />
                <TrashCan v-show="isColumnDragging" />
            </div>
        </div>
        <GridFooter :is-pagination-visible="Boolean(numberOfPages)">
            <template slot="pagination">
                <GridPageSelector
                    v-model="visibleRowsInPageCount"
                    :rows-number="numberOfDataElements" />
                <GridPagination
                    v-model="currentPage"
                    :max-page-number="numberOfPages" />
            </template>
        </GridFooter>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'ProductGridTab',
    components: {
        GridWrapper: () => import('~/components/Grid/GridWrapper'),
        GridFilterActions: () => import('~/components/Grid/GridFilterActions'),
        GridLayoutConfigurator: () => import('~/components/Grid/GridLayoutConfigurator'),
        GridFooter: () => import('~/components/Grid/GridFooter'),
        GridPageSelector: () => import('~/components/Grid/GridPageSelector'),
        GridPagination: () => import('~/components/Grid/GridPagination'),
        // GridGlobalFilters: () => import('~/components/Grid/GridGlobalFilters'),
        VerticalTabBar: () => import('~/components/Tab/VerticalTabBar'),
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
    },
    data: () => ({
        title: 'products',
        verticalTabs: [
            {
                title: 'Filters & Columns',
                component: () => import('~/components/Card/AttributesListTab'),
                icon: 'sprite-sidebar sidebar-filter',
                active: true,
            },
        ],
        gridConfiguration: {
            rows: {
                height: 32,
            },
        },
        filtersNumber: 0,
        filtersExpanded: true,
    }),
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            isColumnDragging: state => state.isColumnDragging,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('grid', {
            numberOfDataElements: state => state.count,
            displayedPage: state => state.displayedPage,
            numberOfDisplayedElements: state => state.numberOfDisplayedElements,
        }),
        ...mapGetters('grid', {
            numberOfPages: 'numberOfPages',
        }),
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
        isGlobalFiltersVisible() {
            return this.isListElementDragging
                || (this.filtersNumber !== 0 && this.filtersExpanded);
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
        currentPage: {
            get() {
                return this.displayedPage;
            },
            set(value) {
                let number = Math.trunc(value);

                if (number < 1) {
                    return;
                }
                if (number > this.numberOfPages) {
                    number = this.numberOfPages;
                }

                this.changeDisplayingPage({ number });
                this.getDataWrapper();
            },
        },
    },
    methods: {
        ...mapActions('grid', [
            'getData',
            'changeDisplayingPage',
            'changeNumberOfDisplayingElements',
        ]),
        getDataWrapper() {
            const { getData: path } = this.actionPaths;
            this.getData(
                {
                    path,
                },
            );
        },
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
