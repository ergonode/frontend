/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :icon="icon" />
        <div class="vertical-wrapper">
            <div class="layout-configuration">
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
    </PageWrapper>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'GridPage',
    components: {
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
        GridWrapper: () => import('~/components/Grid/GridWrapper'),
        GridFooter: () => import('~/components/Grid/GridFooter'),
        GridPageSelector: () => import('~/components/Grid/GridPageSelector'),
        GridPagination: () => import('~/components/Grid/GridPagination'),
        GridLayoutConfigurator: () => import('~/components/Grid/GridLayoutConfigurator'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    props: {
        actionPaths: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            required: true,
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
    },
    data: () => ({
        gridConfiguration: {
            rows: {
                height: 32,
            },
        },
    }),
    computed: {
        ...mapState('grid', {
            numberOfDataElements: state => state.count,
            displayedPage: state => state.displayedPage,
            numberOfDisplayedElements: state => state.numberOfDisplayedElements,
        }),
        ...mapGetters('grid', {
            numberOfPages: 'numberOfPages',
        }),
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
        rowsHeight: {
            get() {
                const { height } = this.gridConfiguration.rows;

                return height;
            },
            set(value) {
                this.gridConfiguration.rows.height = value;
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
    .layout-configuration {
        display: flex;
        justify-content: flex-end;
        padding: 0 4px;
    }

    .vertical-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin: 0 12px;
    }
</style>
