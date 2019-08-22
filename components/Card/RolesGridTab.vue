/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <GridWrapper
                store-namespace="rolesGrid"
                :rows-height="rowsHeight"
                :action-paths="actionPaths" />
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
import GridWrapper from '~/components/Grid/Wrappers/GridWrapper';
import GridFooter from '~/components/Grid/GridFooter';
import GridPageSelector from '~/components/Grid/GridPageSelector';
import GridPagination from '~/components/Grid/GridPagination';

export default {
    name: 'RolesGridTab',
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
            moduleName: 'rolesGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('rolesGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('rolesGrid', {
            numberOfDataElements: state => state.count,
            displayedPage: state => state.displayedPage,
            numberOfDisplayedElements: state => state.numberOfDisplayedElements,
        }),
        ...mapGetters('rolesGrid', {
            numberOfPages: 'numberOfPages',
        }),
        actionPaths() {
            return {
                getData: `${this.userLanguageCode}/roles`,
                routerEdit: 'users-roles-edit-id',
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
        ...mapActions('rolesGrid', [
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
            moduleName: 'rolesGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/roles`;
        await store.dispatch('rolesGrid/getData', { path: gridPath });
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
