/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <GridWrapper
                store-namespace="userActivityLogsGrid"
                :rows-height="rowsHeight"
                :action-paths="actionPaths" />
        </div>
        <GridFooter
            store-namespace="userActivityLogsGrid"
            :is-pagination-visible="Boolean(numberOfPages)">
            <template v-slot:pagination>
                <GridPageSelector
                    v-model="visibleRowsInPageCount"
                    :rows-number="numberOfDataElements" />
                <GridPagination
                    :value="displayedPage"
                    :max-page="numberOfPages"
                    @input="onPageChanged" />
            </template>
        </GridFooter>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import GridWrapper from '~/components/Grid/Wrappers/GridWrapper';
import GridFooter from '~/components/Grid/GridFooter';
import GridPageSelector from '~/components/Grid/GridPageSelector';
import GridPagination from '~/components/Grid/GridPagination';

export default {
    name: 'UserActivityLogsGridTab',
    components: {
        GridWrapper,
        GridFooter,
        GridPageSelector,
        GridPagination,
    },
    data() {
        return {
            gridConfiguration: {
                rows: {
                    height: 32,
                },
            },
            filtersNumber: 0,
            filtersExpanded: true,
        };
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'userActivityLogsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('userActivityLogsGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('userActivityLogsGrid', {
            numberOfDataElements: state => state.count,
            displayedPage: state => state.displayedPage,
            numberOfDisplayedElements: state => state.numberOfDisplayedElements,
        }),
        ...mapGetters('userActivityLogsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        actionPaths() {
            return {
                getData: `${this.userLanguageCode}/profile/log`,
                routerEdit: 'users-logs-edit-id',
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
        ...mapActions('userActivityLogsGrid', [
            'getData',
            'changeDisplayingPage',
            'changeNumberOfDisplayingElements',
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
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'userActivityLogsGrid',
            store,
        });
        const gridPath = '/profile/log';
        await store.dispatch('userActivityLogsGrid/getData', { path: gridPath });
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
        }
    }
</style>
