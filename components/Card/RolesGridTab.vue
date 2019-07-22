/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <div class="filters-panel-wrapper">
                <GridLayoutConfigurator v-model="rowsHeight" />
            </div>
            <GridWrapper
                :rows-height="rowsHeight"
                :action-paths="actionPaths" />
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
import gridModule from '~/reusableStore/grid/state';

export default {
    name: 'RolesGridTab',
    components: {
        GridWrapper: () => import('~/components/Grid/Wrappers/GridWrapper'),
        GridLayoutConfigurator: () => import('~/components/Grid/GridLayoutConfigurator'),
        GridFooter: () => import('~/components/Grid/GridFooter'),
        GridPageSelector: () => import('~/components/Grid/GridPageSelector'),
        GridPagination: () => import('~/components/Grid/GridPagination'),
    },
    data: () => ({
        gridConfiguration: {
            rows: {
                height: 32,
            },
        },
        filtersNumber: 0,
        filtersExpanded: true,
    }),
    beforeCreate() {
        if (!this.$store.state.rolesGrid) {
            this.$store.registerModule('rolesGrid', gridModule);
        }
    },
    destroyed() {
        this.$store.unregisterModule('rolesGrid');
    },
    computed: {
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
                getData: `${this.userLanguageCode}/accounts/roles`,
                routerEdit: 'roles-edit-id',
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

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            margin: 12px 12px 0;
            overflow: hidden;

            .filters-panel-wrapper {
                display: flex;
                justify-content: flex-end;
                padding: 12px 12px 0;
            }
        }
    }
</style>
