/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <Grid
                store-namespace="usersActivityLogsGrid"
                :action-paths="actionPaths"
                :basic-filters="true"
                title="Users activity logs" />
        </div>
        <GridFooter>
            <GridPageSelector
                v-model="visibleRowsInPageCount"
                :rows-number="numberOfDataElements" />
            <GridPagination
                :value="displayedPage"
                :max-page="numberOfPages"
                @input="onPageChanged" />
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

export default {
    name: 'UsersActivityLogsGridTab',
    components: {
        Grid,
        GridFooter,
        GridPageSelector,
        GridPagination,
    },
    data() {
        return {
            filtersNumber: 0,
            filtersExpanded: true,
        };
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'usersActivityLogsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('usersActivityLogsGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('usersActivityLogsGrid', {
            numberOfDataElements: (state) => state.count,
            displayedPage: (state) => state.displayedPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('usersActivityLogsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        actionPaths() {
            return {
                getData: `${this.userLanguageCode}/accounts/log`,
                routerEdit: 'users-logs-edit-id',
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
        ...mapActions('usersActivityLogsGrid', [
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
            moduleName: 'usersActivityLogsGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/accounts/log`;
        await store.dispatch('usersActivityLogsGrid/getData', { path: gridPath });
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
            margin: 24px 24px 0;
            overflow: hidden;
        }
    }
</style>
