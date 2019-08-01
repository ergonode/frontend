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
            <GridWrapper
                store-namespace="grid"
                :rows-height="rowsHeight"
                :action-paths="actionPaths" />
        </div>
        <GridFooter
            store-namespace="grid"
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
    </PageWrapper>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import NavigationHeader from '~/components/ReusableHeader/NavigationHeader';
import GridWrapper from '~/components/Grid/Wrappers/GridWrapper';
import GridFooter from '~/components/Grid/GridFooter';
import GridPageSelector from '~/components/Grid/GridPageSelector';
import GridPagination from '~/components/Grid/GridPagination';
import PageWrapper from '~/components/Layout/PageWrapper';

export default {
    name: 'GridPage',
    components: {
        NavigationHeader,
        GridWrapper,
        GridFooter,
        GridPageSelector,
        GridPagination,
        PageWrapper,
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
            default: null,
        },
    },
    data() {
        return {
            gridConfiguration: {
                rows: {
                    height: 32,
                },
            },
        };
    },
    async beforeCreate() {
        const { getData: path } = this.$options.propsData.actionPaths;

        this.$registerStore({
            module: gridModule,
            moduleName: 'grid',
            store: this.$store,
        });

        await this.$store.dispatch('grid/getData', { path });
    },
    beforeDestroy() {
        this.$store.unregisterModule('grid');
    },
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
