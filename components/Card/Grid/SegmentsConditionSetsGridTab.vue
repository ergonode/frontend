/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <Grid
                namespace="conditionSetsGrid"
                :route-edit="routeEdit"
                :editing-privilege-allowed="$hasAccess('CONDITION_UPDATE')"
                :basic-filters="true"
                title="Condition sets"
                @rowEdit="onRowEdit" />
        </div>
        <GridFooter>
            <GridPageSelector
                v-model="visibleRowsInPageCount"
                :rows-number="numberOfDataElements" />
            <GridPagination
                :value="currentPage"
                :max-page="numberOfPages"
                @input="onPageChanged" />
        </GridFooter>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { FILTER_OPERATOR } from '~/defaults/operators';
import gridModule from '~/reusableStore/grid/state';
import Grid from '~/components/Grid/Grid';
import GridFooter from '~/components/Grid/GridFooter';
import GridPageSelector from '~/components/Grid/GridPageSelector';
import GridPagination from '~/components/Grid/GridPagination';

export default {
    name: 'SegmentsConditionSetsGridTab',
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
            moduleName: 'conditionSetsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('conditionSetsGrid');
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('conditionSetsGrid', {
            numberOfDataElements: (state) => state.count,
            currentPage: (state) => state.currentPage,
            numberOfDisplayedElements: (state) => state.numberOfDisplayedElements,
        }),
        ...mapGetters('conditionSetsGrid', {
            numberOfPages: 'numberOfPages',
        }),
        routeEdit() {
            return {
                getData: `${this.userLanguageCode}/conditionsets`,
                name: 'segments-condition-set-edit-id',
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
        ...mapActions('conditionSetsGrid', [
            'getData',
            'setCurrentPage',
            'changeNumberOfDisplayingElements',
        ]),
        onRowEdit({ links: { edit } }) {
            const args = edit.href.split('/');
            const lastIndex = args.length - 1;

            this.$router.push({ name: 'segments-condition-set-edit-id-general', params: { id: args[lastIndex] } });
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
    },
    async fetch({ app, store }) {
        const gridPath = `${store.state.authentication.user.language}/conditionsets`;

        app.$registerStore({
            module: gridModule,
            moduleName: 'conditionSetsGrid',
            store,
        });
        await store.dispatch('conditionSetsGrid/setFilter', { id: 'parent', filter: 'segment', operator: FILTER_OPERATOR.EQUAL });
        await store.dispatch('conditionSetsGrid/getData', { path: gridPath });
    },
};
</script>

<style lang="scss" scoped>
    .tab {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $WHITE;

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            margin: 24px 24px 0;
            overflow: hidden;
        }
    }
</style>
